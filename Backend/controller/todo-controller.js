const bcryptjs = require("bcryptjs");
const  generateTokenAndSetCookie  = require("../middleware/generateTokenandCookie");
const User  = require("../models/user-model");
const { validateUser, validateloginSchema, validateDataSchema } = require("../utils/validator");

const todoData = async (req, res) => {
    try {
        const { error } = validateDataSchema(req.body);
        if (error) {
            console.log("Validation error", error.details[0].message);
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const email = req.body.email.toLowerCase().trim();
        console.log(email)
        const { password, name } = req.body;

        const userAlreadyExists = await User.findOne({email})
    
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
        });

        await user.save();
        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log(error,"error")
        res.status(400).json({ success: false, message: error.message });
    }
};


module.exports = { todoData };
