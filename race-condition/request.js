import axios from 'axios';

async function simulateRaceCondition() {
  try {
    console.log('Starting simulation...');
    
    const axiosInstance1 = axios.create();
    const axiosInstance2 = axios.create();

    const triggerRequests = async () => {
      return Promise.all([
        axiosInstance1.patch('http://localhost:3000/buy/tickets/11/user/11').then(response => {
          console.log('User 11 Response:', response.data);
        }).catch(error => {
          console.error('User 11 Error:', error.response?.data || error.message);
        }),
        axiosInstance2.patch('http://localhost:3000/buy/tickets/11/user/12').then(response => {
          console.log('User 12 Response:', response.data);
        }).catch(error => {
          console.error('User 12 Error:', error.response?.data || error.message);
        })
      ]);
    };
    await triggerRequests();
  } catch (error) {
    console.error('Unexpected Error:', error.response?.data || error.message);
  }
}

// Execute the function
simulateRaceCondition();
