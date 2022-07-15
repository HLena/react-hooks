import { db  } from '../firebase/firebase-config';
import { collection, query, getDocs } from "firebase/firestore";


export const loadNotes = async(uid) => {

    const response = query(collection(db,`${uid}/journal/notes`));
    let notes = [];
    const querySnapshot = await getDocs(response);
    querySnapshot.forEach((doc) => {
        notes.push({
            id: doc.id,
            ...doc.data()
        })
    })
    return notes;

}