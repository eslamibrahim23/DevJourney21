const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.router");

const storsRoute = require("./routes/stories.router");
const storiesuserRoute = require("./routes/storiesuserRoute");
const connect = require("./dataBase/connectToDB");

const { verifyToken, checkRole } = require("./middleware/auth");
const User = require("./models/user.model");
const story = require("./models/post.model");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
//
app.use(cors());
app.use(express.json());
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (eror) {
    console.log(eror);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.get("/test", (req, res) => {
  res.json({
    message: "Hello",
  });
});
app.use("/user", verifyToken, checkRole(), userRoute);
app.use("/DevJourney", authRoute);

//stories
app.use("/story", verifyToken, checkRole(), storsRoute);
app.use("/stoybyuser", verifyToken, checkRole(), storiesuserRoute )
// app.use("/story", storsRoute);
// app.use("t",verifyToken,checkRole(),)
connect();
app.listen(PORT, () => {
  console.log(PORT, "server is running..");
});


