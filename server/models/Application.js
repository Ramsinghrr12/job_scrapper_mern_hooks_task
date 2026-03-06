import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
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
    status: {
      type: String,
      enum: ['Applied', 'Interview', 'Rejected', 'Selected'],
      default: 'Applied',
    },
    dateApplied: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Application', applicationSchema);
