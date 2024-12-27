const mongoose = require('mongoose');

const CongeSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  debut: { type: String, required: true },
  fin: { type: String, required: true },
  raison: { type: String, required: true },
  status: {
    type: String,
    enum: ['en attente', 'approuvé', 'rejeté'],
    default: 'en attente'
  },
  approverId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
}, {
  timestamps: true
});

const Conge = mongoose.model('Conge', CongeSchema);
module.exports = Conge;