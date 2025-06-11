const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cartRoutes = require('./routes/cartRoutes');
const replyRoutes = require('./routes/replyRoutes');

// To serve uploaded images

//const MONGO_URI = 'mongodb+srv://241299:<db_password>@cluster0.dxar4cf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/items', itemRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/replies', replyRoutes);

console.log(`Connecting to MongoDB with URI: ${process.env.MONGO_URI}`);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected successfully!');
  })
  .catch(err => {
    console.error('Connection failed:', err.message);
  });


// app.get('/', (req, res) => {
//     res.send('Howdy');
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});