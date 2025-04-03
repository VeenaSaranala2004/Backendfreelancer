const Profile = require("../models/profileModel");

// CREATE PROFILE
exports.createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json({ message: "Profile Created", profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL PROFILES
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET PROFILE BY ID
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: "Profile Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (profile) {
      await profile.update(req.body);
      res.status(200).json({ message: "Profile Updated", profile });
    } else {
      res.status(404).json({ message: "Profile Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE PROFILE
exports.deleteProfile = async (req, res) => {
  try {
    const deleted = await Profile.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(200).json({ message: "Profile Deleted" });
    } else {
      res.status(404).json({ message: "Profile Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
