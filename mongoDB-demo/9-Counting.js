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

// Saving Documents
async function createCourse() {
    const course = new Course({
        name: 'React Course',
        author: 'Bikram',
        tags: ['react', 'Frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

createCourse();

// Count of Documents
async function getCourses() {
    const courses = await Course
        .find({ author: 'Bikram', isPublished: true })
        .limit(10)
        .sort( {name: 1 } )
        .count()
    console.log(courses);
}

getCourses();
