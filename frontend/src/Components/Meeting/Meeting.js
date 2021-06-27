import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import {delete_meeting} from '../../API/delete';
import './Meeting.css'

export default function Meeting({meeting, updateParent, index}) {

    const {meetingName, meetingId} =  meeting;
    const history = useHistory();

    const handleJoin = (e) => {
        history.push(`/join/${JSON.stringify(meeting)}`)
    }
    const handleDelete = (e) => {
       const promise = delete_meeting(meetingId);
        updateParent(index);
    }

    return (
        <div class="meeting-container">
            <fieldset class="meeting-fieldset">
                <legend>{meetingName}</legend>
                ID: {meetingId}
                <button onClick={handleJoin}>Join </button>
                <button onClick={handleDelete}>Delete</button>
            </fieldset>
        </div>
    )
}
