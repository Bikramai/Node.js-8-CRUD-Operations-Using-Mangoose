// Schemas:- we use a schema in Mongoose to define the shape of documents in a MongoDB collection.
// So we use that to define what are the properties we have in this document.

// How to create Schemas in MongoDB database?

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// shape of an object
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});
