const fs = require('fs')

const getNotes = () => {
  return "Your notes..."
}

const addNote = function(title, body) {
  const notes = loadNotes()

  const duplicateNotes = notes.filter((note) => {
    return note.title === title
  })

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    })
    console.log("New note added!")
  } else {
    console.log("Note title taken!")
  }

  notes.push({
    title: title,
    body: body
  })

  saveNotes(notes)
}

const removeNote = (title) => {
  const notes = loadNotes()

  const filteredNotes = notes.filter((note) => {
    return note.title !== title
  })

  saveNotes(filteredNotes)
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync("notes.json", dataJSON)
}

const loadNotes = function() {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch(e) {
    return []
  }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
}
