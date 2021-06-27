import React, {useState} from 'react'
import SwitchComponent from '../Switch/SwitchComponent'

export default function Queue({data33}) {

    const data = {
        queue_name : "Queue",
        queue_data: []
    }

    const [queue, setQueue] = useState(data.queue_data)
    const [active, setActive] = useState(false);

    const handleAdd = (new_value) => {
        setQueue(old => [...old, new_value])
    }

    setInterval(()=> {
        fetch('/api/queue').then(response => response.json()).then(data => {
            const {queue_name} = data;
            if (queue_name !== "none") {
                const {queue_data} = data;
                handleAdd(queue_data)
            }
        })
    }, 5000)

    const handleRemove = (e) => {
        e.preventDefault()
        const id = parseInt(e.target.getAttribute("index"))
        queue.splice(id, 1)
        setQueue([...queue])
    }

    return (
        <div>
            <h3>Queue:</h3>
            Queue Name: {data.queue_name}
            <SwitchComponent checked={active} setChecked={setActive} />
            {active && <div class="queue-display">
                {queue.map((element, index) => {
                    return (
                        <div class="queue-val">
                        {element.text}
                        <button index={index} onClick={handleRemove}> Remove </button>
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}
