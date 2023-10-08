const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = "sadahfldaldf";
exports.find = async (req, res) => {
  try {
    const result = await userModel.find();
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  const existingEamil = await userModel.findOne({ email });
  if (existingEamil) return res.status(422).send("Email Alrady Exist");

  //Hashing Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const result = await user.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.update = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await userModel.findByIdAndUpdate({ _id }, req.body, {
      new: true,
    });
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await userModel.findOneAndDelete(_id);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return res.status(400).send("Email Not Exist");
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("Wrong password");

  const token = jwt.sign({ _id: user._id }, TOKEN_SECRET);
  res.header("auth-token", token).send(token);
};
