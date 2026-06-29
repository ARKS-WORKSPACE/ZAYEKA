import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  ref: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  guests: {
    type: Number,
    required: true,
    min: 1
  },
  tableId: {
    type: String,
    required: true
  },
  tableName: {
    type: String,
    required: true
  },
  tableType: {
    type: String,
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
  occasion: {
    type: String,
    default: ''
  },
  specialRequests: {
    type: String,
    default: ''
  },
  dishes: {
    type: mongoose.Schema.Types.Mixed, // Stores { "1": 2, "4": 1 } representing { dishId: quantity }
    default: {}
  },
  status: {
    type: String,
    default: 'Confirmed',
    enum: ['Confirmed', 'Pending', 'Cancelled', 'Completed']
  }
}, {
  timestamps: true
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
