var mongoose = require('mongoose');

var calendarSchema = new mongoose.Schema({
    events:    [{type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    description:    String,
    title: String
});

exports.Calendar = mongoose.model('Calendar', calendarSchema);
