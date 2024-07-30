 // controllers/userController.js
const userModel = require('../models/userModel');

// Read

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(
      {
      success: true,
      data: users 
      });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Internal server error' });
  }
};


// Create
exports.createUser = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(
      { success: true,
        message: 'User created successfully',
        data: savedUser
      });
    }
  catch (err) {
    res.status(500).json(
      { success: false, 
        message: 'Internal server error'
      });     }
};

// Update
exports.updateUser = async (req, res) => {
  try {
    const { _id, ...rest } = req.body;
    const updatedUser = await userModel.updateOne({ _id }, rest, { 
      new: true });

    if (!updatedUser) {
      return res.status(404).json({ 
      success: false,
      message: 'User not found' });
    }
    res.status(200).json({ 
      success: true,
      message: 'User updated successfully',
      data: updatedUser });
  } catch (err) {
    res.status(500).json(
      { 
      success: false,
      message: 'Internal server error' 
      });
  }
};



// Delete
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json(
        { 
      success: false,
      message: 'User not found' 
      });
    }
    res.status(200).json({ 
      success: true,
      message: 'User deleted successfully',
      data: deletedUser });
  } catch (err) {
    res.status(500).json(
     { 
      success: false,
      message: 'Internal server error'
     });
  }
};