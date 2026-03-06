import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    jobLink: {
      type: String,
      required: true,
    },
    keyword: {
      type: String,
    },
    scrapedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Job', jobSchema);
