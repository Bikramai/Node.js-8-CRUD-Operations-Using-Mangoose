/* 
Query First Approch:- this approach is useful, if youreceive an input from the client,
and you want to make sure that the update is a valid operation.

For metaphor, here we have business rule, so if the cours isPublished, 
maybe we should not be allowed to change its author. To implement this
business role, we need to retrieve the course first, and then we need 
to write some logic like this. So if course isPublished, we want to return.
We don't want to update this course. so that's when we use the query first approach.
*/

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

// Updating a Document-Query First
async function updateCourse(id) {
    // 1. Approach: Query first
    // findById()
    // Modify its properties
    // save()

    const course = await Course.findById(id);
    if (!course) return;

    course.isPublished = true;
    course.author = 'Another Author';

    const result = await course.save();
    console.log(result);

    // 2. Approach: Update first
    // Update directly
    // Optionally: get the updated document
}

updateCourse('662bc304698bfc06b7490672');
