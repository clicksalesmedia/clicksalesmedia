// models/Sql.js
import mongoose from 'mongoose';

const sqlSchema = new mongoose.Schema({
  contactRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Mql', required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Sql = mongoose.models.Sql || mongoose.model('Sql', sqlSchema);
export default Sql;
