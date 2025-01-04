import express from 'express';
import mongoose from 'mongoose';
import Redis from 'ioredis'

const app = express();
const port = 3000;


const redis = new Redis({
  host: 'localhost',
  port: 6379
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connection=mongoose.connect("mongodb://localhost:27017/test")
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);  
  });

const productSchema=new mongoose.Schema({
  name:{type: String, require: true}
})

export const Product = mongoose.model('Products', productSchema);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}); 

export const User = mongoose.model('Users', userSchema);

const CACHE_KEYS = {
  ALL_PRODUCTS: 'all_products',
  USER_EMAIL:'email',
};

app.get('/all/products',async (req,res)=>{
  try {
    const cachedProducts = await redis.get(CACHE_KEYS.ALL_PRODUCTS);
    if (cachedProducts) {
      console.log('Cache hit while fetching products- returning cached products');
      res.send(JSON.parse(cachedProducts));
      return;
    }

    console.log('Cache miss while fetching products- fetching from database');
    const products = await Product.find();
    
    await redis.setex(
      CACHE_KEYS.ALL_PRODUCTS,
      20,
      JSON.stringify(products)
    );
    
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error retrieving products');
  }
})

app.get('/protected/all/products',async (req, res, next)=>{
  const email = req.headers.email;
  if(!email){
    return res.status(404).json({ 
      success: false, 
      message: 'User not found' 
    });
  }
  const userCached = await redis.get(CACHE_KEYS.USER_EMAIL+email);
  console.log('This is userCahced ',userCached);
  
  if (userCached) {
      console.log('Cache hit while fetching user- returning cached products');
  }else{
  console.log('Cache miss while fetching user- fetching from database');
  const existingUser = await User.findOne({ email });
    await redis.setex(
      CACHE_KEYS.USER_EMAIL+existingUser.email,
      20,
      existingUser.email
    );
  if (!existingUser) {
    return res.status(404).json({ 
      success: false, 
      message: 'User not found' 
    });
  }}
  next()
},async(req,res)=>{
  try {
    const cachedProducts = await redis.get(CACHE_KEYS.ALL_PRODUCTS);
    if (cachedProducts) {
      console.log('Cache hit while fetching products- returning cached products');
      res.send(JSON.parse(cachedProducts));
      return;
    }

    console.log('Cache miss while fetching products- fetching from database');
    const products = await Product.find();
    
    await redis.setex(
      CACHE_KEYS.ALL_PRODUCTS,
      20,
      JSON.stringify(products)
    );
    
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error retrieving products');
  }
})

// Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});







