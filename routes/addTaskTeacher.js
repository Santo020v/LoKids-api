const router = require("express").Router();
const { Task, validate } = require("../models/task");

router.post("/", async (req, res) => {
	try {
        const { error } = validate(req.body.data1);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

        console.log(req.body);

		const task = await Task.findOne({ link: req.body.data1.link});
        if (task) {
            return res.status(400).send({ message: "Task with this link is already exist" });
        }
        else{
            await new Task({type: req.body.data1.type, title: req.body.data1.title ,text: req.body.data1.text, link: req.body.data1.link, teacherId: req.body.teacherId}).save();
            return res.status(200).send({ message: "OK" });
        }
	} catch (e) {
        res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;