export default class NotesAPI {
    static getAllNotes() {
        const defaultNotes = [
            {
                id: 0,
                name: 'ARCHIVED | B-day',
                updated: new Date(2021, 2, 30),
                category: 'Task',
                content: 'Holiday',
                dateslist: '',
                archived: true,
            },
            {
                id: 0,
                name: 'B-day',
                updated: new Date(2021, 2, 30),
                category: 'Task',
                content: 'Holiday',
                dateslist: '',
                archived: false,
            },
            {
                id: 1,
                name: 'Shopping List',
                updated: new Date(2021, 3, 20),
                category: 'Task',
                content: 'Tomatoes, bread',
                dateslist: '',
                archived: false,
            },
            {
                id: 2,
                name: 'The theory of evolution',
                updated: new Date(2021, 3, 27),
                category: 'Random Thought',
                content:
                    'The evolution evolution  evolution  evolution  evolution  evolution.',
                dateslist: '',
                archived: false,
            },
            {
                id: 3,
                name: 'New Feature',
                updated: new Date(2021, 4, 5),
                category: 'Idea',
                content: 'Implement new feature 3/5/2021',
                dateslist: '3/5/2021, 5/5/2021',
                archived: false,
            },
            {
                id: 4,
                name: 'William Gaddis',
                updated: new Date(2021, 4, 7),
                category: 'Random Thought',
                content: 'Power doesn`t counted...',
                dateslist: '',
                archived: false,
            },
            {
                id: 5,
                name: 'Books',
                updated: new Date(2021, 4, 15),
                category: 'Task',
                content: 'The Lean Startup',
                dateslist: '',
                archived: false,
            },
            {
                id: 6,
                name: 'Redesign',
                updated: new Date(2021, 4, 20),
                category: 'Idea',
                content: 'Change UI/UX',
                dateslist: '',
                archived: false,
            },
        ];

        const notes = JSON.parse(
            localStorage.getItem('notesapp-notes') ||
                JSON.stringify([...defaultNotes])
        );
        return (
            notes
                // .filter((note) => note.archived === false)
                .sort((a, b) => {
                    return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
                })
        );
    }

    static saveNote(noteToSave) {
        const notes = NotesAPI.getAllNotes();
        const existing = notes.find((note) => note.id == noteToSave.id);
        const currentDate = new Date();
        const parseDate = (str) => {
            const reg = /(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g;
            const m = str.match(reg);
            // m.map((date) => date.replace(/[.\-]/, '/'));
            // m.replace(/([.\-/])/g, '/');
            return m ? m.join(', ') : null;
        };

        const datesList = parseDate(noteToSave.content)
            ? `${currentDate.getDate()}/${
                  currentDate.getMonth() + 1
              }/${currentDate.getFullYear()}, ${parseDate(noteToSave.content)}`
            : '';
        // Edit/Update
        if (existing) {
            existing.name = noteToSave.name;
            existing.content = noteToSave.content;
            existing.updated = currentDate.toISOString();
            existing.category = noteToSave.category;
            existing.dateslist = datesList;
        } else {
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = currentDate.toISOString();
            noteToSave.archived = false;
            noteToSave.dateslist = datesList;
            notes.push(noteToSave);
        }

        localStorage.setItem('notesapp-notes', JSON.stringify(notes));
    }

    static deleteNote(id) {
        const notes = NotesAPI.getAllNotes();
        const newNotes = notes.filter((note) => note.id != id);

        localStorage.setItem('notesapp-notes', JSON.stringify(newNotes));
    }

    static archiveNote(id) {
        const notes = NotesAPI.getAllNotes();
        const existing = notes.find((note) => note.id == id);
        existing.updated = new Date().toISOString();
        existing.archived = !existing.archived;

        localStorage.setItem('notesapp-notes', JSON.stringify(notes));
    }
}
