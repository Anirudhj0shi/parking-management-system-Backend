// models/Slot.js

import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  slotNumber: {
    type: Number,
    required: true,
  },
});

const Slot = mongoose.model('Slot', slotSchema);
// const User = mongoose.model('user', UserSchema);

export default Slot;
 