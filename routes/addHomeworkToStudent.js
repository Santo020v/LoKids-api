const router = require("express").Router();
const { Homework, validate } = require("../models/homework");

router.post("/", async (req, res) => {
	try {
        const { error } = validate(req.body);
        console.log(error);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

        console.log(req.body);
        await new Homework({tasks: req.body.tasks, studentId: req.body.studentId,  date: req.body.date, isDone: req.body.isDone, score: req.body.score}).save();
	} catch (e) {
        res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;