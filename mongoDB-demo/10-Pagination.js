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

// Page of Documents and the given page
async function getCourses() {
    // Hard codint
    const pageNumber = 2;
    const pageSize = 10;

    //realworld 
    // /api/courses?pageNumber=2&pageSize=10

    const courses = await Course
        .find({ author: 'Bikram', isPublished: true })
        .skip((pageNumber - 1) * pageSize)// pagination 
        .limit(pageSize)
        .sort( {name: 1 } )
        .count()
    console.log(courses);
}

getCourses();
