import NotesView from './NotesView.js';
import NotesAPI from './NotesAPI.js';

export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());

        this._refreshNotes();
    }

    _refreshNotes() {
        const notes = NotesAPI.getAllNotes();

        this._setNotes(notes);
    }

    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes);
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }

    _handlers() {
        return {
            onNoteSelect: (noteId) => {
                const selectedNote = this.notes.find(
                    (note) => note.id == noteId
                );
                this._setActiveNote(selectedNote);
            },

            onNoteAdd: (name, category, content) => {
                const newNote = {
                    name: name,
                    category: category,
                    content: content,
                };

                if (this.activeNote) {
                    newNote.id = this.activeNote.id;
                }
                NotesAPI.saveNote(newNote);
                this._refreshNotes();
                this.activeNote = null;
            },

            onNoteEdit: (name, content, category) => {
                NotesAPI.saveNote({
                    id: this.activeNote.id,
                    name,
                    content,
                    category,
                });

                this._refreshNotes();
            },

            onNoteDelete: (noteId) => {
                NotesAPI.deleteNote(noteId);
                this._refreshNotes();
            },

            onNoteArchive: (noteId) => {
                NotesAPI.archiveNote(noteId);
                this._refreshNotes();
            },
        };
    }
}
