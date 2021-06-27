import React, {useState, useEffect} from 'react'
import CustomCommand from '../CustomCommand/CustomCommand'
import Status from '../Status/Status'
import Queue from '../Queue/Queue'
import {update_meeting} from '../../API/post'
import {useParams, useHistory} from 'react-router-dom'
import io from 'socket.io-client'


export default function View({data}) {
    
    const {meeting_data} = useParams();
    const history = useHistory();
    const [meeting, setMeeting] = useState(JSON.parse(meeting_data));
    const [open, setOpen] = useState({value: false, message: "Changes saved"});
    // const bot_socket = io.connect("http://localhost:5000/bot");

    const handleUpdate = (obj) => {
        setMeeting(old => {return {...old, ...obj}})
    }

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({meetingId: meeting.meetingId})
        };
        fetch('/initiateBot', requestOptions)
    }, [])

    useEffect(()=> {
        const promise = update_meeting(meeting)

        promise.then(data => {
            const {STATUS} = data;
            if (STATUS === "OK") {
                setOpen(old => {return {...old, value: true}});
                setTimeout(()=>{setOpen(old => {return {...old, value: false}});}, 750);
            }
        })
        // setOpen(old => {return {...old, value: true}});
        // setTimeout(()=>{setOpen(old => {return {...old, value: false}});}, 750);

    }, [meeting])

    return (
       <>
        <div class="meeting-info">
            <div className="meeting-form-input">
                    <label htmlFor="">Meeting Name:</label>
                    <input type="text" value={meeting.meetingName} 
                    onChange={(e)=> handleUpdate({meetingName: e.target.value})}/>
                </div>

                <div className="meeting-form-input">
                    <label htmlFor="">Meeting ID:</label>
                    <input value={meeting.meetingId} 
                    onChange={(e)=> handleUpdate({meetingId: e.target.value})}/>
                </div>

                <div className="meeting-form-input">
                    <label htmlFor="">Meeting Password:</label>
                    <input type="text" value={meeting.meetingCode} 
                    onChange={(e)=> handleUpdate({meetingCode: e.target.value})}/> 
                </div>
        </div>
        <div className="meeting-settings">
            <div className="meeting-faqs">
                <h3>FAQ:</h3>
                <label htmlFor="">Command: {meeting.settings.wakeWord}faq </label>
                <CustomCommand params={{command: "Quesiton", description: "Answer", property: "faqs"}} 
                               commandState={meeting.settings} 
                               handleChange={handleUpdate}
                               />
            </div>
            <div className="meeting-announcemnts">
                <h3>Annoucements:</h3>
                <label htmlFor="">Command: {meeting.settings.wakeWord}announcements </label>
                <CustomCommand params={{command: "Subheading", description: "body", property: "announcements"}} 
                               commandState={meeting.settings} 
                               handleChange={handleUpdate}
                               />
            </div>
            <div className="meeting-custom">
                <h3>Custom Commands:</h3>
                <CustomCommand params={{command: "Command", description: "Text", property: "textCommands"}} 
                               commandState={meeting.settings} 
                               handleChange={handleUpdate}
                               />
            </div>
            <div className="meeting-wake-word">

            </div>
        </div>
        <div className="queue">
            <Queue />
            
        </div>
        <button onClick={()=> {history.push('/')}}>back </button>
        <Status open={open.value} message={open.message} />
       </>
    )
}
