require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const addStudentRoutes = require("./routes/addStudent");
const getStudents = require("./routes/getStudents");
const getHWStudent = require("./routes/getStudentHomework");
const getAllTask = require("./routes/getAllTask");
const addHomeworkToStudent = require("./routes/addHomeworkToStudent");
const getHomewworkById = require("./routes/getHomeworkById");
const setDoneToTask = require("./routes/setDoneDataOfTask");
const addTaskTeacher = require("./routes/addTaskTeacher");
const getTaskByTeacherId = require("./routes/getTaskByTeacherId");

connection();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/studentAdd", addStudentRoutes);
app.use("/api/getStudents", getStudents);
app.use("/api/student/:_id", getHWStudent);
app.use("/api/getAllTask", getAllTask);
app.use("/api/addHomeworkToStudent", addHomeworkToStudent);
app.use("/api/getHomewworkById", getHomewworkById);
app.use("/api/setDoneDataToTask", setDoneToTask);
app.use("/api/addTask", addTaskTeacher);
app.use("/api/getTaskByTeacherId", getTaskByTeacherId);


const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));