const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://james:${password}@cluster0.50rrj3w.mongodb.net/noteApp?retryWrites=true&w=majority`

// create table schema
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

// makes the collection
const Note = mongoose.model('Note', noteSchema)

// connect to db server
mongoose.connect(url)

// adding a note
// .then(result => {
//   console.log('connected');

//   const note = new Note({
//     content: 'Callback functions suck',
//     date: new Date(),
//     important: true
//   })

//   return note.save();
// })
// .then(result => {
//   mongoose.connection.close();
// })
// .catch(err => console.log(err));


// fetch all notes
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
