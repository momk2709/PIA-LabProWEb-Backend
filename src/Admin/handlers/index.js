const { getAllCourses } = require("./course.handler");
const { getAllInstructor } = require("./instructor.handler");
const { getAllUsers } = require("./users.handler");

module.exports = { getAllCourses, getAllInstructor, getAllUsers };
