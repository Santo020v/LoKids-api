const router = require("express").Router();
const { User } = require("../models/user");
const {Teacher} = require("../models/teachers");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {

	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
        const teacher = await Teacher.findOne({ email: req.body.email });
    
        if(user){
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!validPassword)
                return res.status(401).send({ message: "Invalid Email or Password" });

            const token = user.generateAuthToken();
        
            res.status(200).json({ token: token, userId: user._id, usertype: user.typeofuser});

        }
        else if (teacher){
            const validPasswordTeacher = await bcrypt.compare(
                req.body.password,
                teacher.password
            );
    
            if (!validPasswordTeacher)
                return res.status(401).send({ message: "Invalid Email or Password" });
    
            const tokenTeacher = teacher.generateAuthToken();
           
            res.status(200).send({ token: tokenTeacher, teacherId: teacher._id, usertype: teacher.typeofuser });
        }
		else {
            return res.status(401).send({ message: "Invalid Email " });
        }
        
	} catch (e) {
        res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;