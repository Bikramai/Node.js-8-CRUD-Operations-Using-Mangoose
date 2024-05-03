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

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        author: 'Bikram',
        tags: ['node', 'backend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

createCourse();
//Note:
// As we know whenever we use await our code should be inside 
// an async function. 