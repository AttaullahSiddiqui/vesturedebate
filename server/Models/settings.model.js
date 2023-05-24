let mongoose = require('mongoose');

let settingsSchema = mongoose.Schema({
    tags: { type: Array, required: true },
    eventName: { type: String },
    eventBarText: { type: String }
});
module.exports = mongoose.model('Settings', settingsSchema);