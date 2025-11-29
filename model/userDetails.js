const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vehicle: { type: String, required: true },
  mobile: { type: String, required: true, minlength: 10, maxlength: 10, unique: true, index: true },
  bill: { type: String, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Form', FormSchema);
