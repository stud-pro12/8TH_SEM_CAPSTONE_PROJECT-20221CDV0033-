import Module from '../models/Module.js';

// Get All Modules
export const getAllModules = async (req, res) => {
  try {
    const modules = await Module.find().sort({ order: 1 });
    res.json({ success: true, modules });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Module
export const getModule = async (req, res) => {
  try {
    const module = await Module.findOne({ moduleNumber: req.params.id });
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.json({ success: true, module });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Module (Admin only - for seeding data)
export const createModule = async (req, res) => {
  try {
    const module = await Module.create(req.body);
    res.status(201).json({ success: true, module });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};