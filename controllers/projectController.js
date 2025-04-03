const Project = require("../models/projectModel");

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ message: "Project Created", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL PROJECTS
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET PROJECT BY ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Project Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE PROJECT
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      await project.update(req.body);
      res.status(200).json({ message: "Project Updated", project });
    } else {
      res.status(404).json({ message: "Project Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE PROJECT
exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(200).json({ message: "Project Deleted" });
    } else {
      res.status(404).json({ message: "Project Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
