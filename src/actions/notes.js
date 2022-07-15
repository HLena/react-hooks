import { db  } from '../firebase/firebase-config';
import { types } from '../types/types';
import { collection, addDoc, doc, writeBatch, deleteDoc} from "firebase/firestore";
import { loadNotes } from '../helpers/loadNotes';
import Swal from 'sweetalert2';
import { fileUpload } from '../helpers/fileUpload';

export const createNote = () => {
    return async (dispatch, getState) => {


        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await addDoc(collection(db, `${uid}`, 'journal/notes'), newNote );

        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote));

    }
}

export const saveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if(!note.url) delete note.url;

        const noteToFirestore ={ ...note };
        delete noteToFirestore.id; 
        const batch = writeBatch(db);
        const sfRef = doc(db, `${uid}`, `journal/notes/${note.id}`);
        batch.update(sfRef, noteToFirestore);
        await batch.commit();

        dispatch(updateNote(note.id, noteToFirestore))
        Swal.fire('Saved',note.title, 'success');

    }
}

export const loadingNotes = ( email, password, name ) => {
    return ( dispatch ) => {

    }
}


export const activeNote = (id, note) => ({
    type: types.noteActive,
    payload: {
        id,
        ...note
    }
})

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
   
});

export const removeNote = (id) => ({
    type: types.notesDeleted,
    payload: id
})


export const updateNote = (id, note) => ({
    type: types.noteUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})


export const startUplounding = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text:'Please wait',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;
        dispatch(saveNote(activeNote));

        Swal.close()
    }
}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        await deleteDoc(doc(db, `${uid}/journal/notes/${id}`))
        dispatch(removeNote(id))
    }

}

export const logoutCleaning = () => ({
    type: types.notesLogoutCleaning,
    payload: {
        notes: [],
        active: null
    }
})


