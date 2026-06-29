import mongoose from 'mongoose';

const eventRSVPSchema = new mongoose.Schema({
  ref: {
    type: String,
    required: true,
    unique: true
  },
  eventId: {
    type: Number,
    required: true
  },
  eventTitle: {
    type: String,
    required: true
  },
  eventDate: {
    type: String,
    required: true
  },
  eventTime: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  guests: {
    type: Number,
    required: true,
    default: 1,
    min: 1
  },
  requirements: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'Confirmed',
    enum: ['Confirmed', 'Cancelled', 'Checked-In']
  }
}, {
  timestamps: true
});

const EventRSVP = mongoose.model('EventRSVP', eventRSVPSchema);

export default EventRSVP;
