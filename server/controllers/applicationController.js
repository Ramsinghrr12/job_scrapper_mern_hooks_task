import Application from '../models/Application.js';

export const createApplication = async (req, res) => {
  try {
    const { title, company, location, platform, jobLink } = req.body;

    if (!title || !company || !location || !platform || !jobLink) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const application = await Application.create({
      user: req.user.id,
      title,
      company,
      location,
      platform,
      jobLink,
    });

    res.status(201).json({
      success: true,
      application,
      message: 'Application saved successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id }).sort({ dateApplied: -1 });

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Please provide status' });
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.status(200).json({
      success: true,
      application,
      message: 'Application updated successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Application deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
