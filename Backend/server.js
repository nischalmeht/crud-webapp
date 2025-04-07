const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/connectDB');
const userRoutes = require('./routes/user.routes');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies
app.use("/api/auth", userRoutes);


app.listen(PORT, () => {
	connectDB();
	console.log("Server is running on port: ", PORT);
});