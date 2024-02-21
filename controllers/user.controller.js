const User = require("../models/user.model.js");

const getAllUser = async (req, res, next) => {
  try {
    const findAll = await User.find();
    res.json({ findAll, message: "api is working!" });
  } catch (error) {
    res.json({ status: "failed! can`t fetch users" });
    next();
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const findById = await User.findById(id);
    res.json({ findById });
  } catch (error) {
    res.json({
      statud: "User Not found go to Register page",
    });
    next();
  }
};
const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updated = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(updated);
  } catch (error) {
    res.json({
      statud: "User Not found go to Register page",
    });
    next();
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({ deleteUser, message: "User Deleted successfully!" });
  } catch (error) {
    res.json({
      statud: "User Not found go to Register page",
    });
    next();
  }
};

module.exports = { getAllUser, updateUser, deleteUser, getUserById };
