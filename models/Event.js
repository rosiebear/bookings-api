var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    //calendar:           {type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    title:              String,
    maxAttendees:       {type: Number, default: 1}//,
   /* eventStart:         {type: Date, default: Date.now},
    eventEnd:           {type: Date, default: Date.now},
    allDay:             Boolean,
    repeat:             Boolean,
    repeatType:         String,
    repeatFinalDate:    String,
    repeatInterval:     {type: Number, default: 0},
    repeatCount:        {type: Number, default: 0},
    repeatDaysOfWeek:   [Number],
    repeatExcludeDays:  [String]*/
});

exports.Event = mongoose.model('Event', eventSchema);
