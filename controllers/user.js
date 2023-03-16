import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  try {
    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
};
//DELETE
export const deleteUser = async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  try {
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(err);
  }
};
// GET
export const getUser = async (req, res, next) => {
  const User = await User.findById(req.params.id);
  try {
    res.status(200).json(User);
  } catch (err) {
    next(err);
  }
};
//GET ALL
export const getUsers = async (req, res, next) => {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (err) {
    next(err);
  }
};
