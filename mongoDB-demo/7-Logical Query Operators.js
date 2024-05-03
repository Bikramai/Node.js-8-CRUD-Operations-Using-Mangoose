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

// Logical Query Operators 
// Courses that are published but they are not authored by Bikram.
// That's where we need the or operator.
async function getCourses() {
    // or
    // and

    const courses = await Course
        // .find({ author: 'Bikram', isPublished: true })
        .find()
        .or([ { author: 'Bikram' }, { isPublished: true } ])
        .and([]) // we find in complex queries using .and method
        .limit(10)
        .sort( {name: 1 } )
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

getCourses();
