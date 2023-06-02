const router = require("express").Router();
const { Task } = require("../models/task");

router.post("/", async (req, res) => {
	try {
		const task = await Task.find({teacherId: req.body.teacherId});
        if (task) {
            res.status(200).json({task});
        }
        else{
            return res.status(400).send({ message: "Error" });
        }
	} catch (e) {
        res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;