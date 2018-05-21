const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;

// TODO password reset

const PhotoSchema = new Schema({
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  // img: {},
  // tags: {},
});

module.exports = mongoose.model('Photo', PhotoSchema);
