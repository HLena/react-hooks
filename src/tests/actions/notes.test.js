import { deleteDoc, doc, getDoc } from '@firebase/firestore'
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { createNote, saveNote, startLoadingNotes, startUplounding } from '../../actions/notes'
import { db } from '../../firebase/firebase-config'
import { fileUpload } from '../../helpers/fileUpload'
import { types } from '../../types/types'

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn(() => {
        return 'https://hola-mundo.com/cosa.jpg'
    })
}))



const middlewares = [thunk]
const mockStore = configureStore(middlewares)


const initState = {
    auth: {
        uid: 'testing-user-uid'
    },
    notes:{
        active: {
            id: '3du3KnyP6r4cIUaWd0vb',
            title: 'Hola',
            body: 'Mundo'
        }
    }
}


let store = mockStore(initState)

describe('Pruebas de acciones de notas', () => {

    beforeEach(() => {

        store = mockStore(initState)

    })
    test('Debe de crear una nueva nota ', async () => {
        
        await store.dispatch(createNote());

        const actions = store.getActions();
        // console.log(actions)

        expect(actions[0]).toEqual({
            type: types.noteActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }

        })

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })

        const docId = actions[0].payload.id;
        await deleteDoc(doc(db, `testing-user-uid/journal/notes/${docId}`));
    });

    test('StartLoadingNotes debe cargar las notas', async() => {
        
        await store.dispatch(startLoadingNotes('testing-user-uid'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        })

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }

        expect(actions[0].payload[0]).toMatchObject(expected);
    })

    test('startSaveNote debe actualizar la nota', async() => {
        
        const note = {
            id: '3du3KnyP6r4cIUaWd0vb',
            title:'titulo',
            body: 'body'
        }

        await store.dispatch(saveNote(note));
        const actions = store.getActions();

        expect(actions[0].type).toBe(types.noteUpdated);
        
        const docRef = await doc(db,`testing-user-uid/journal/notes/${note.id}`);
        const docSnap = await getDoc(docRef)
        
        expect(docSnap.data().title).toBe(note.title);


    })

    test('startUploading debe actualizar el url de la imagen', async () => {
      
        const file = new File([], 'foto.jpg');
        await store.dispatch(startUplounding(file));

        const docRef = await doc(db,`testing-user-uid/journal/notes/${initState.notes.active.id}`);
        const docSnap = await getDoc(docRef)

        expect(docSnap.data().url).toBe('https://hola-mundo.com/cosa.jpg')

    });
    
    
    


    
    
})
