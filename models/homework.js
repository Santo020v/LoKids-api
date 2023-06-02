const mongoose = require("mongoose");
const Joi = require("joi");

const homeworkSchema = new mongoose.Schema({
    tasks: [{idTask: String, isDoneTask:Boolean}],
    studentId: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    date: {type: Date, required: true},
    isDone: {type: Boolean, required: true},
    score: {type: Number, required: true},
});

const Homework = mongoose.model("homeworks", homeworkSchema);

const validate = (data) => {
	const schema = Joi.object({
        tasks: Joi.array(),
        studentId: Joi.string().required(),
        date: Joi.date().required(),
        isDone: Joi.bool().required(),
        score: Joi.number().required(),
	});
	return schema.validate(data);
};

module.exports = { Homework, validate};