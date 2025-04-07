const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		verificationToken: String,
	},
	{ timestamps: true }
);

 const User = mongoose.model("User", userSchema);
 module.exports = User;
 