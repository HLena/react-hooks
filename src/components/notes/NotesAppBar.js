import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { addNewNote, saveNote, startDeleting, startUplounding } from '../../actions/notes'
import moment from 'moment'
import Swal from 'sweetalert2'


export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector( state => state.notes );

    const handleSaveNote = () => {
        dispatch(saveNote(active))
        dispatch(addNewNote(active.id, active))
    }

    const handlePictreUpload = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            dispatch(startUplounding(file));
        }
    }

    const handleDeleteNote = async () => {
        const { isConfirmed } = await Swal.fire({
            text: 'Do you want to delete this note?',
            title: 'Delete Note',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it'
        });

        if(isConfirmed){
            dispatch(startDeleting(active.id));
            Swal.fire(
                'Deleted!',
                'Your note has been deleted.',
                'success'
              )
        }

    }

    return (
        <div className="notes__appbar">
            <span>{moment(active.date).format('Do')} {moment(active.date).format('dddd')}, {moment(active.date).format('yyyy')} </span>

            <input 
                id = "fileSelector"
                type="file" 
                style={{display: 'none'}}
                name = 'file'
                onChange = { handleFileChange }
            />

            <div>
                <button className="btn"
                    onClick = {handleDeleteNote}
                >
                    Delete
                </button>
                <button 
                    className="btn"
                    onClick = {handlePictreUpload}
                >
                    Picture
                </button>

                <button className="btn"
                    onClick = {handleSaveNote}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
