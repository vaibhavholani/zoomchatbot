import React, {useState, useEffect} from 'react'
import {get_all} from '../../API/get';
import Meeting from '../Meeting/Meeting';
import { useHistory } from 'react-router-dom';

export default function Dashboard() {
    
    const [meetings, setMeetings] = useState([]);
    const history = useHistory();
    
    const handleAdd = (e) => {
        history.push('/add')
    }

    const deleteIndex = (index) => {
        meetings.splice(index, 1)
        setMeetings([...meetings])
    }

    useEffect(()=> {
        const promise = get_all();
        promise.then(data => {
            const keys = Object.keys(data)
            const meetings = []
            keys.forEach(key => {meetings.push(data[key])})
            setMeetings(meetings);
        })
    }, [])

    // Need to get all meetings here and then 
    return (
        <>
        <button onClick={handleAdd}>Add Meeting</button>
        <div >
            {meetings.map((element, index) => {
                return (
                    <Meeting meeting={element} index={index} updateParent={deleteIndex}/>
                )
            })}
        </div>
        </>
    )
}
