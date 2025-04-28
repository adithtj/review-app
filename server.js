const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Replace with your MongoDB connection string:
mongoose.connect('mongodb+srv://adhyy:mypassword@cluster0.c1msf1y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const reviewSchema = new mongoose.Schema({
    hotelName: String,
    reviewerName: String,
    reviewText: String,
});

const Review = mongoose.model('Review', reviewSchema);

app.get('/reviews', async (req, res) => {
    const reviews = await Review.find();
    res.json(reviews);
});

app.post('/reviews', async (req, res) => {
    const { hotelName, reviewerName, reviewText } = req.body;
    const newReview = new Review({ hotelName, reviewerName, reviewText });
    await newReview.save();
    res.json(newReview);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
