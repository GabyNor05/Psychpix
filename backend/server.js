const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
 // To serve uploaded images

//const MONGO_URI = 'mongodb+srv://241299:<db_password>@cluster0.dxar4cf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/items', itemRoutes);
app.use('/uploads', express.static('uploads'));
console.log(`Connecting to MongoDB with URI: ${process.env.MONGO_URI}`);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected successfully!');
  })
  .catch(err => {
    console.error('Connection failed:', err.message);
  });

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Howdy');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});