const express = require('express');
const { MongoClient} = require('mongodb');
const { ObjectId } = require('mongodb');
const cors = require('cors');
// const cros = require('cros');
const app = express();
const port = 4000;

// MongoDB connection details
// const uri = "mongodb://127.0.0.1:27017"; 

   const uri = "mongodb+srv://priymavanicg:kuch_bhi@cluster0.ihc5j.mongodb.net/"
const dbName = "codinggita";

// Middleware
app.use(express.json());
app.use(cors());
let db, courses;

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri,);
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        // students = db.collection("students");
        courses = db.collection("courses");

        // Start server after successful DB connection
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit if database connection fails
    }
}

// Initialize Database
initializeDatabase();

// Routes


// -----------------------------------------------------------------------------------------------------------------------------------------------------------
// GET: List all courses
app.get('/courses', async (req, res) => {
    try {
        const allStudents = await courses.find().toArray();
        res.status(200).json(allStudents);
    } catch (err) {
        res.status(500).send("Error fetching students: " + err.message);
    }
});


// GET: search by courseCode
app.get('/courses/:courseCode', async (req, res) => {
    try {
        // console.log(req.params);
        const courseCode =req.params.courseCode;
        const result = await courses.find({ courseCode}).toArray();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send("Error fetching students: " + err.message);
    }
});

// GET: search by _id
app.get('/courses/id/:_id', async (req, res) => {
    try {

        // console.log(req.params);
        const _id =(req.params._id);

        // console.log("_id  : ",_id);
        const result = await courses.findOne({_id:new ObjectId(_id)});
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send("Error fetching students: " + err.message);
    }
});


// -----------------------------------------------------------------------------------------------------------------------------------------------------------

// POST: Add a course 
app.post('/courses', async (req, res) => {
    try {
        // console.log("request Object : ",req); 
        // console.log("requestBody : ",req.body);
        const course = req.body;
        const result = await courses.insertOne(course);
        res.status(201).send(`course added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding student: " + err.message);
    }
});

// -----------------------------------------------------------------------------------------------------------------------------------------------------------

// PUT: Update a curses completely
app.put('/courses/:courseCode', async (req, res) => {
    try {

        // console.log("request Params : ",req.params);
        // console.log("request Object : ",req.body);

        const courseCode = (req.params.courseCode);
        
        // console.log(req.params);
        // console.log(courseCode);
        const updatedcourses = req.body;
        const result = await courses.replaceOne({ courseCode }, updatedcourses);
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error updating student: " + err.message);
    }
});



// PUT: Update a course completely by _id
app.put('/courses/id/:_id', async (req, res) => {
    try {

        // console.log("request Params : ",req.params);
        // console.log("request Object : ",req.body);

        const _id = (req.params._id);
        
        // console.log(req.params);
        // console.log(_id);
        const updatedcourses = req.body;
        const result = await courses.replaceOne({ _id:new ObjectId(_id) }, updatedcourses);
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error updating student: " + err.message);
    }
});


// -----------------------------------------------------------------------------------------------------------------------------------------------------------


// PATCH: Partially update a course
app.patch('/courses/:courseCode', async (req, res) => {
    try {
        // console.log("request Params : ",req.params);
        // console.log("request Body : ",req.body);

        const coursecode = (req.params);
        // console.log(coursecode);
        const updates = req.body;
        const result = await courses.updateOne( coursecode , { $set: updates });
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error partially updating student: " + err.message);
    }
});


// PATCH: Partially update a course
app.patch('/courses/id/:_id', async (req, res) => {
    try {
        
        const _id = (req.params._id);
        // console.log(coursecode);
        const updates = req.body;
        const result = await courses.updateOne( {_id:new ObjectId(_id)} , { $set: updates });
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error partially updating student: " + err.message);
    }
});

// -----------------------------------------------------------------------------------------------------------------------------------------------------------

// DELETE: Remove a course
app.delete('/courses/:courseCode', async (req, res) => {
    try {
        const courseCode = (req.params.courseCode);

        // console.log(rollNumber);

        const result = await courses.deleteOne({courseCode});
        res.status(200).send(`${result.deletedCount} document(s) deleted`);
    } catch (err) {
        res.status(500).send("Error deleting student: " + err.message);
    }
});

// DELETE: Remove a courseby _id
app.delete('/courses/id/:_id', async (req, res) => {
    try {
        const _id = (req.params._id);

        // console.log(rollNumber);

        const result = await courses.deleteOne({ _id:new ObjectId(_id)});
        res.status(200).send(`${result.deletedCount} document(s) deleted`);
    } catch (err) {
        res.status(500).send("Error deleting student: " + err.message);
    }
});








