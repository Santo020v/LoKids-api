const router = require("express").Router();
const { User } = require("../models/user");

router.post("/", async (req, res) => {
	try {
        tId=req.body.teacherId
		const users = await User.find({ teacherId: tId});
        if (users) {
            res.status(200).json({users});
        }
        else{
            return res.status(409).send({ message: "Error" });
        }
	} catch (e) {
        res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;