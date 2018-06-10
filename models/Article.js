const mongoose = require('../libs/mongoose');

const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Укажите поле name'
    },
    description: {
        type: String,
        required: 'Укажите поле description'
    },
    html: {
        type: String
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }
}, {
  timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);