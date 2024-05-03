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

        // Starts with Bikram
        .find({ author: /^Bikram/ }) // as long as the author starts wit Bikram, it doesn't matter what we have after.

        // Ends with Phurumbo
        .find({ author: /Phurumbo$/i}) // which author ends with given string/pattern. $ sign indicates the end of string.

        // Ends with Phurumbo
        .find({ author: /.*Bikram.*/i}) // looks beginning or middle or end. .* indicates 0 or more characters, i indicates case insensitive.

        .limit(10)
        .sort( {name: 1 } )
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

getCourses();
