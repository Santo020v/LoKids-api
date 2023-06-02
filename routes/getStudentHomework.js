const router = require("express").Router();
const { Homework } = require("../models/homework");

router.post("/", async (req, res) => {
	try {
		const homework = await Homework.find({studentId: req.body._id});
        if (homework) {
            res.status(200).json(homework);
        }
        else{
            return res.status(409).send({ message: "Error" });
        }
	} catch (e) {
        res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;