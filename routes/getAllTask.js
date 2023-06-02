const router = require("express").Router();
const { Task } = require("../models/task");

router.get("/", async (req, res) => {
	try {
		const task = await Task.find({});
        if (task) {
            res.status(200).json({task});
        }
        else{
            return res.status(409).send({ message: "Error" });
        }
	} catch (e) {
        res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;