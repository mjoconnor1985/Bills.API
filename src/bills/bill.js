const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
    name: String,
    amount: Number,
    nextDueDate: Date
}, {collection: 'Bills'});

const Bills = mongoose.model('Bill', billSchema);

module.exports = Bills;