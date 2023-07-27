const express = require("express");
const mongoose = require("mongoose");
const userDetails = require("./app");
const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://procorp:6T2VL3A3xGbUrggG@cluster0.gew0mei.mongodb.net/userdb?retryWrites=true&w=majority"
  )
  .then(() => console.log("successfully connected"))
  .catch((err) => console.log(err));

app.post("/signup", async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    const newData = new userDetails({ firstName, lastName });

    await newData.save();

    return res.json("Registration successful");
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/allusers", async (req, res) => {
  try {
    const data = await userDetails
      .find()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log(data);

    return res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.listen(4000, () => {
  console.log("app listen port 4000!!");
});
