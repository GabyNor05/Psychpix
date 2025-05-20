const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

//const MONGO_URI = 'mongodb+srv://241299:<db_password>@cluster0.dxar4cf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api/users', userRoutes);

 app.get('/', (req, red) => {
     res.send('Howdy');
 });

app.listen(PORT, () => {
    console.log("Howdy");
    console.log(`Server is running on port ${PORT}`);
});