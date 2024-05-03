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

// instances of the classes - Classes, object 
// Human, Bikram -> Course, nodeCourse
// Human are blueprint but a bikram is just an instance of that blueprint.

// Models of Course
const Course = mongoose.model('Course', courseSchema);
const course = new Course({
    name: 'Node.js Course',
    author: 'Bikram',
    tags: ['node', 'backend'],
    isPublished: true
});

// Explanation:
// In NoSQL database, we can see that a document in MongoDB can be a complex object.
// so here, this tags property is an array of strings. We don't have something like 
// that in the relational databases. 

// In other words, the row in a relational database has simple attributes.
// if we want to model this structure in a reational database, we need three tables,
// courses, tags, and an intermediary table called course tags. 
// Because here, we have many to many relationship between courses and tags.

// where as In MongoDB database, we don't have the structure, 
// we don't have to define these tables, we don't have to script them.
// we simply create our objects and store them in the database. 
// That's why we call them schema less, they don't have schema.
