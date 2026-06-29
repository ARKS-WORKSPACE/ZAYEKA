import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['indian', 'continental', 'desserts', 'drinks']
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  longDescription: {
    type: String,
    required: true
  },
  tags: [String],
  ingredients: [String],
  chefNotes: String,
  pairing: String
}, {
  timestamps: true
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
