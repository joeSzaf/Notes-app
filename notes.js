const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
  return "Your notes..."
}

const addNote = (title, body) => {
  const notes = loadNotes()

  const duplicateNotes = notes.filter((note) => {
    return note.title === title
  })

  if (duplicateNotes.length === 0) {
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
    console.log(chalk.bold(`${index + 1}. ${note.title}`))
    console.log(`    ${note.body}`)
  })
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync("notes.json", dataJSON)
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
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes
}
