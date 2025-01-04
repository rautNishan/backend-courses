import mongoose from 'mongoose';
import { Product } from './server.js';
import { User } from './server.js';

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/test").then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

const categories = ['Laptop', 'Smartphone', 'Tablet', 'Monitor', 'Keyboard', 'Mouse', 'Headphones', 'Speaker', 'Camera', 'Printer'];

function generateProducts() {
    const products = [];
    for (let i = 0; i < 10000; i++) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      products.push({ name: `${randomCategory} Model ${i + 1}` });
    }
    return products;
}

function generateUsers() {
  const users = [];
  for (let i = 0; i < 1000; i++) {
    const randomEmail = `user${i + 1}@example.com`;
    const randomPassword = `password${i + 1}`;
    users.push({ email: randomEmail, password: randomPassword });
  }
  return users;
}

const seedProducts = generateProducts();
const seedUsers = generateUsers();

async function seedDB() {
  try {
    // Insert products
    await Product.insertMany(seedProducts);
    console.log('Products seeded');

    // Insert users
    await User.insertMany(seedUsers);
    console.log('Users seeded');

    mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
}

seedDB();
