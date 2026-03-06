import { scrapeInternshala } from '../services/scrapeInternshala.js';
import { scrapeUnstop } from '../services/scrapeUnstop.js';

export const scrapeJobs = async (req, res) => {
  try {
    const { keyword, location, platform } = req.body;

    if (!keyword || !location || !platform) {
      return res.status(400).json({ success: false, message: 'Please provide keyword, location, and platform' });
    }

    let jobs = [];

    if (platform === 'internshala') {
      jobs = await scrapeInternshala(keyword, location);
    } else if (platform === 'unstop') {
      jobs = await scrapeUnstop(keyword, location);
    } else {
      return res.status(400).json({ success: false, message: 'Invalid platform' });
    }

    res.status(200).json({
      success: true,
      jobs,
      count: jobs.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
