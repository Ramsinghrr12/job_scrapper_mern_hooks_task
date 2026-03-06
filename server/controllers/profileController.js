import User from '../models/User.js';
import fs from 'fs';
import path from 'path';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updates = {};

    if (name) updates.name = name;
    if (email) updates.email = email;

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true });

    res.status(200).json({
      success: true,
      user,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.profileImage) {
      // Remove image file path
      user.profileImage = null;
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Profile image deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file provided' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: req.file.path },
      { new: true }
    );

    res.status(200).json({
      success: true,
      user,
      message: 'Profile image uploaded successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
