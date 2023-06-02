const router = require("express").Router();
const { Homework } = require("../models/homework");

router.post("/", async (req, res) => {
	try {
        const query = { _id: req.body.idHomework};
        const updateDocument = {
            $set: { "tasks.$[i].isDoneTask": true }
        };
        const options = {
        arrayFilters: [
            {
            "i.idTask": req.body.idTask
            }
        ]
        };
        const result = await Homework.updateOne(query, updateDocument, options);

	} catch (e) {
        res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;