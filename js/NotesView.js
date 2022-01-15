export default class NotesView {
    constructor(
        root,
        {
            onNoteSelect,
            onNoteAdd,
            onNoteEdit,
            onNoteDelete,
            onNoteArchive,
        } = {}
    ) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.onNoteArchive = onNoteArchive;

        this.root.innerHTML = `
            <div class="row mt-3 bg-secondary text-white border rounded">
                <div class="col m-3">Name</div>
                <div class="col m-3">Created</div>
                <div class="col m-3">Category</div>
                <div class="col m-3">Content</div>
                <div class="col m-3">Dates</div>
                <div class="col-md-auto m-3">
                    <div id="header-archive"class="header-archive d-inline m-1">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="archive"
                            class="svg-inline--fa fa-archive fa-w-16"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M32 448c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32V160H32v288zm160-212c0-6.6 5.4-12 12-12h104c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-8zM480 32H32C14.3 32 0 46.3 0 64v48c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16V64c0-17.7-14.3-32-32-32z"
                            ></path>
                        </svg>
                    </div>
                    <div class="delete d-inline m-1">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="far"
                            data-icon="trash-alt"
                            class="svg-inline--fa fa-trash-alt fa-w-14"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill="currentColor"
                                d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
            <!-- Todo Item -->
            <div id="todoItem" class='notes__list'>
            </div>

            <!-- Create Note Form -->
            <form id='form'>
                <div class="row mt-3 border rounded">
                    <div class="col-3 mt-3 mb-3">
                        <input
							id="inputNoteName"
                            type="text"
                            class="form-control"
                            placeholder="Note name"
                            aria-label="Notename"
                            aria-describedby="basic-addon1"
							class="notes__title"
                        />
                    </div>
                    <div class="col-2  mt-3 mb-3">
                        <select
                            class="form-control selector"
                            id="inputNoteCategory"
							placeholder="Category"
                        >
                            <option value="Task">Task</option>
                            <option value="Random Thought">Random Thought</option>
                            <option value="Idea">Idea</option>
                        </select>
                    </div>
                    <div class="col  mt-3 mb-3">
                        <textarea
							placeholder="Note content"
                            class="notes__body form-control"
                            id="inputNoteBody"
                            rows="1"
                        ></textarea>
                    </div>
                </div>
                <!-- Add Button -->
                <div class="addButton d-flex flex-row-reverse">
                    <button type="submit" id="btnAddNote" class="btn btn-secondary mt-3">
                        Create Note
                    </button>
                </div>
            </form>
            <!-- Summary Table Header -->
            <div class="row mt-3 bg-secondary text-white border rounded">
                <div class="col-6 m-3">Note category</div>
                <div class="col m-3">Active</div>
                <div class="col m-3">Archived</div>
            </div>
			<div id="summaryTable" class='summaryTable'>
            </div>
        `;

        const formAddNote = document.getElementById('form');
        const btnAddNote = document.getElementById('btnAddNote');
        const inpTitle = document.getElementById('inputNoteName');
        const inpBody = document.getElementById('inputNoteBody');
        const inpCategory = document.getElementById('inputNoteCategory');
        const btnArchive = document.getElementById('header-archive');
        btnArchive.addEventListener('click', () => {
            alert('Function in development');
        });
        formAddNote.addEventListener('submit', (e) => {
            e.preventDefault();
            this.onNoteAdd(inpTitle.value, inpCategory.value, inpBody.value);
            inpTitle.value = '';
            inpBody.value = '';
            btnAddNote.textContent = 'Create Note';
        });
    }

    _createListItemHTML(id, name, updated, category, content, dates) {
        return `
                <div class="row mt-3 border rounded notes__list-item" data-note-id="${id}">
                    <div class="col m-3 text-truncate">${name}</div>
                    <div class="col m-3 text-truncate">${updated.getDate()}/${
            updated.getMonth() + 1
        }/${updated.getFullYear()}</div>
                    <div class="col m-3 text-truncate">${category}</div>
                    <div class="col m-3 text-truncate">${content}</div>
                    <div class="col m-3 text-truncate">${dates}</div>
                    <div class="col-md-auto m-3">
                        <div class="edit d-inline note-edit m-1">
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="edit"
                                class="svg-inline--fa fa-edit fa-w-18"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
                                ></path>
                            </svg>
                        </div>
                        <div class="archive d-inline note-archive m-1">
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="archive"
                                class="svg-inline--fa fa-archive fa-w-16"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M32 448c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32V160H32v288zm160-212c0-6.6 5.4-12 12-12h104c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-8zM480 32H32C14.3 32 0 46.3 0 64v48c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16V64c0-17.7-14.3-32-32-32z"
                                ></path>
                            </svg>
                        </div>
                        <div class="delete d-inline note-delete m-1">
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="far"
                                data-icon="trash-alt"
                                class="svg-inline--fa fa-trash-alt fa-w-14"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </div>
        `;
    }

    _createListSummaryHTML(category, acrhived, active) {
        return `
            <div class="row mt-3 mb-3 border rounded">
                <div class="col-6 m-3">${category}</div>
                <div class="col m-3">${acrhived}</div>
                <div class="col m-3">${active}</div>
            </div>
		`;
    }

    updateNoteList(notes, archived = false) {
        const notesListContainer = this.root.querySelector('.notes__list');
        const summaryTableContainer = this.root.querySelector('.summaryTable');
        // Empty list
        notesListContainer.innerHTML = '';
        summaryTableContainer.innerHTML = '';
        const allCategories = new Set();

        for (const note of notes) {
            allCategories.add(note.category);
            if (note.archived === archived) {
                const html = this._createListItemHTML(
                    note.id,
                    note.name,
                    new Date(note.updated),
                    note.category,
                    note.content,
                    note.dateslist
                );
                notesListContainer.insertAdjacentHTML('beforeend', html);
            }
        }

        for (const category of allCategories) {
            const archived = notes
                .filter((note) => note.category === category)
                .filter((note) => note.archived === false).length;
            const active = notes
                .filter((note) => note.category === category)
                .filter((note) => note.archived === true).length;
            console.log(`${category}|${archived}|${active}`);
            const html = this._createListSummaryHTML(
                category,
                archived,
                active
            );

            summaryTableContainer.insertAdjacentHTML('beforeend', html);
        }

        // Add select/delete events for each list item
        notesListContainer
            .querySelectorAll('.notes__list-item')
            .forEach((noteListItem) => {
                const editNote = noteListItem.querySelector('.note-edit');
                const editArchive = noteListItem.querySelector('.note-archive');
                const editDelete = noteListItem.querySelector('.note-delete');
                editNote.addEventListener('click', () => {
                    this.onNoteSelect(noteListItem.dataset.noteId);
                    btnAddNote.textContent = 'Update Note';
                });

                editDelete.addEventListener('click', () => {
                    const doDelete = confirm(
                        'Are you sure you want to delete this note?'
                    );

                    if (doDelete) {
                        this.onNoteDelete(noteListItem.dataset.noteId);
                    }
                });

                editArchive.addEventListener('click', () => {
                    const doArchive = confirm(
                        'Are you sure you want to archive this note?'
                    );

                    if (doArchive) {
                        this.onNoteArchive(noteListItem.dataset.noteId);
                    }
                });
            });

        this.root
            .querySelectorAll('.notes__list-item')
            .forEach((noteListItem) => {
                noteListItem.classList.remove('border-dark');
            });
    }

    updateActiveNote(note) {
        document.getElementById('inputNoteName').value = note.name;
        document.getElementById('inputNoteBody').value = note.content;
        const sel = document.getElementById('inputNoteCategory');
        (function () {
            const opts = sel.getElementsByTagName('option');
            for (let i = 0; i < opts.length; i++) {
                if (opts[i].value == note.category) {
                    sel.selectedIndex = i;
                    break;
                }
            }
        })();

        this.root
            .querySelectorAll('.notes__list-item')
            .forEach((noteListItem) => {
                noteListItem.classList.remove('border-dark');
            });

        this.root
            .querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
            .classList.add('border-dark');
    }
}
