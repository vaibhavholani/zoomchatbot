import React, {useState} from 'react'
import {useForm} from 'react-hook-form';
import {insert_meeting} from '../../API/put'
import Status from '../Status/Status'
import { useHistory } from 'react-router-dom';

export default function Create() {

    const {register, handleSubmit} = useForm();
    const [open, setOpen] = useState({value: false, message: "Meeting Created"});
    const history = useHistory();

    const onSubmit = (value) => {
        const promise = insert_meeting(value)

        promise.then(data => {
            const {STATUS} = data;
            if (STATUS === "OK") {
                setOpen(old => {return {...old, value: true}});
                setTimeout(()=>{
                    setOpen(old => {return {...old, value: false}});
                    history.push('/')
                }, 1000);
            }
        })
        
    }

    return (
        <div class="add-meeting-card">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="meeting-form-input">
                    <label htmlFor="">Meeting Name:</label>
                    <input type="text" {...register('meetingName', {required: true})} />
                </div>

                <div className="meeting-form-input">
                    <label htmlFor="">Meeting ID:</label>
                    <input type="text" {...register('meetingId', {required: true})} />
                </div>

                <div className="meeting-form-input">
                    <label htmlFor="">Meeting Password:</label>
                    <input type="text" {...register('meetingCode', {required: true})} />
                </div>
                <input type="submit"/>
            </form>
            <Status open={open.value} message={open.message} />
        </div>
        
    )
}
