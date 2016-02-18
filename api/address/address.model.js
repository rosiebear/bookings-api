var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    postCode: {
        type: String
    }
});

exports.Address = mongoose.model('Address', addressSchema);
exports.addressSchema = addressSchema;