const express = require("express");
const courses = express.Router();

const courseModel = require("../Models/Course");

courses.get('/', async (req, res) => {
    res.send('Hello')

})

module.exports = courses; 
