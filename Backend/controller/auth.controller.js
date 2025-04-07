const bcryptjs = require("bcryptjs");
const  generateTokenAndSetCookie  = require("../middleware/generateTokenandCookie");
const User  = require("../models/user-model");
const { validateUser, validateloginSchema } = require("../utils/validator");

const signup = async (req, res) => {
    try {
        const { error } = validateUser(req.body);
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

const login = async (req, res) => {
    try {
        const { error } = validateloginSchema(req.body);
        if (error) {
            console.log("Validation error", error.details[0].message);
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        console.log(error,'errorerrorerror')

    
        const email = req.body.email;

        const { password } = req.body;


        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        console.log("isPasswordValid",isPasswordValid)
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

       generateTokenAndSetCookie(res, user._id);
   

        await user.save();
        console.log(user)
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
            ...user._doc,
            password: undefined,
            },
        });
        

    } catch (error) {
        console.log("Error in login ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { signup, login };
