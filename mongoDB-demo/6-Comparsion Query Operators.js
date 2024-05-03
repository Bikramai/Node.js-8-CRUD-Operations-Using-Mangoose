// How to built more complex queries?

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

// Query and filtering, limit, sort, select etc Documents 
async function getCourses() {
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in 
    // nin (not in)

    // Comparison Query Operators
    const courses = await Course
       // .find({ author: 'Bikram', isPublished: true })
       // .find( { price: { $gte: 10, $lte: 20 } } ) // btw $10 - $20
        .find ( { price: { $in: [10, 15, 20] } } ) // dealing with 3 values -$10 or $15 or $20
        .limit(10)
        .sort( {name: 1 } )
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

getCourses();
