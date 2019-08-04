const chalk = require('chalk')
const yargs = require('yargs')

const notes = require('./notes.js')

// Customize yargs vesrion
yargs.version('1.1.0')

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: "The important stuff",
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body)
  }
})

// Create remove command
yargs.command({
  command: 'remove',
  describe: "Remove a note",
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv){
    notes.removeNote(argv.title)
  }
})

// Create list command
yargs.command({
  command: 'list',
  describe: "List the notes",
  handler(){
    notes.listNotes()
  }
})

// Create read command
yargs.command({
  command: 'read',
  describe: "read the notes",
  handler(){
    console.log("Reading the notes")
  }
})

// add, remove, read, list

yargs.parse()
