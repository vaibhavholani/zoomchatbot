import React from 'react'

export default function Wake({register, entity_name}) {

    const {wake_command} = entity_name
    return (
        <div>
            <label>Wake Command: </label>
            <input {...register(wake_command)}/>
        </div>
    )
}
