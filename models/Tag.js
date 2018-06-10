const mongoose = require('../libs/mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Укажите поле name'
    }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true // for console.log, to output children
  }
});

tagSchema.virtual('articles', {
    ref: 'Article', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'tag' // is equal to `foreignField`
  });

module.exports = mongoose.model('Tag', tagSchema);