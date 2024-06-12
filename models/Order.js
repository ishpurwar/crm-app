const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer',
  },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
