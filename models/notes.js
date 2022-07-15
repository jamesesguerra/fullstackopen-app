const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;

mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB.')
    })
    .catch((err) => console.log(err));

const noteSchema = new mongoose.Schema({
    content: {
        type: String, 
        minLength: 5, 
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    important: Boolean,
});

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema);
    