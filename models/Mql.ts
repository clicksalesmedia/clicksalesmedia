import mongoose from 'mongoose';

const mqlSchema = new mongoose.Schema({
  contactRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['Showed', 'No Showed'],
    default: 'No Showed', 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Using ES module export syntax
const Mql = mongoose.models.Mql || mongoose.model('Mql', mqlSchema);
export default Mql;
