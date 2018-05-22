const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;
// * Multer middleware can help with server-side image uploads 

const PhotoSchema = new Schema({
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  img: { data: Buffer, contentType: String },
  // tags: {},
  // path:
  // filename || originalname:
});

module.exports = mongoose.model('Photo', PhotoSchema);
