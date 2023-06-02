const router = require("express").Router();
const { User } = require("../models/user");
const {Teacher} = require("../models/teachers")
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body.data);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.data.email });
		const teacher = await Teacher.find({})

        if (!user) {
            return res.status(409).send({ message: "User with given email don`t Exist!" });
        }
        else{
			if(user.teacherId != teacher._id){
				return res.status(409).send({ message: "This student have teacher" });
			}else{
				const user1 = await User.findOneAndUpdate({ email: req.body.data.email }, {teacherId: req.body.teacherId});

				res.status(200).json({userId: user1._id, usertype: user1.typeofuser, teacherId: user1.teacherId});
			}
            
        }
	} catch (e) {
        res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
	});
	return schema.validate(data);
};

module.exports = router;