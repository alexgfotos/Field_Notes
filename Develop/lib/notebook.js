const note = require("./note.js");

class Notebook {
    constructor(_title) {
        this.title = _title;
        this.idCount = 0;
    }

    saveNote(_title, _date, _text, _id) {
        const newNote = new Note(_title, _date, _text, this.idCount++)
        // fs append json here

    }

    deleteNote(_id) {
        // delete note from db.json here
    }

    
}



module.exports = Notebook