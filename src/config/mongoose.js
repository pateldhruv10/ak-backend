const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://akinfotech:AK%40infotech365@akinfotech.btzd1oz.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

module.exports = mongoose;