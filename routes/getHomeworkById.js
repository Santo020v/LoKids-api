const router = require("express").Router();
const { Homework } = require("../models/homework");
const {Task} = require("../models/task");

router.post("/", async (req, res) => {
	try {
		const homework = await Homework.findOne({_id: req.body.idHomework});
        let score = 0;
        homework.tasks.forEach(function(element) {
            if (element.isDoneTask == true) {
                score +=1;
            }
        })
        await Homework.findOneAndUpdate({_id: req.body.idHomework}, {score:score});
        let b = [];
        homework.tasks.forEach((i => b.push(i.idTask)));
        if (homework) {
            const task = await Task.find({_id: b})

            res.status(200).json({task, homework});
        }
        else{
            return res.status(409).send({ message: "Error" });
        }
	} catch (e) {
        res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;