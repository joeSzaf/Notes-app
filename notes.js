const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
  const notes = loadNotes()

  const duplicateNote = notes.find((note) => {
    return note.title === title
  })

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    console.log(chalk.green.inverse("New note added!"))
  } else {
    console.log(chalk.red.inverse("Note title taken!"))
  }

  saveNotes(notes)
}

const removeNote = (title) => {
  const notes = loadNotes()

  const filteredNotes = notes.filter((note) => {
    return note.title !== title
  })

  if (notes.length > filteredNotes.length) {
    console.log(chalk.green.inverse("Note removed!"))
    saveNotes(filteredNotes)
  } else {
    console.log(chalk.red.inverse("No note found."))
  }

  saveNotes(filteredNotes)
}

const listNotes = () => {
  const notes = loadNotes()

  console.log(chalk.white.bold.bgBlue("  Your notes  "))
  notes.forEach((note, index) => {
    console.log(chalk(`${index + 1}. ${note.title}`))
  })
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync("notes.json", dataJSON)
}

const readNotes = (title) => {
  const notes = loadNotes()

  const noteToRead = notes.find((note) => {
    return note.title === title
  })

  if (noteToRead) {
    console.log(chalk.inverse(noteToRead.title))
    console.log(noteToRead.body)
  } else {
    console.log(chalk.red.inverse("No note found"))
  }
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch(e) {
    return []
  }
}



module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes
}
