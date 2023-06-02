const mongoose = require("mongoose");
const Joi = require("joi");



const taskSchema = new mongoose.Schema({
	type: { type: String, required: true },
	title: { type: String, required: true },
	text: { type: String, required: true },
	link: { type: String, required: true },
	teacherId: {type: mongoose.Schema.Types.ObjectId, ref: 'teachers'},
});

const Task = mongoose.model("tasks", taskSchema);

const validate = (data) => {
	const schema = Joi.object({
		type: Joi.string().required().label("Type"),
		title: Joi.string().required().label("Title"),
		text: Joi.string().required().label("Text"),
		link: Joi.string().required().label("Link"),
		teacherId: "",
	});
	return schema.validate(data);
};

module.exports = { Task, validate };