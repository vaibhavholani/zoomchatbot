import React, {useState, useEffect} from 'react'
import './CustomCommand.css'

export default function CustomCommand({params, commandState, handleChange }) {
    
    const {command, description, property} = params;
    const base = {command: "", description: ""};
    const [commands, setCommands] = useState(commandState[property])
    const [input, setInput] = useState(base)

    const updateParent = () => {
        commandState[property] = commands;
        handleChange({settings: commandState})
    }

    const handleEdit = e => {
        e.preventDefault()
        const {value} = e.target;
        const id = parseInt(e.target.getAttribute("index"))
        const type = e.target.getAttribute("marker")
        if (type === "command") {
            commands[id].command = value
        }
        else {
            commands[id].description = value
        }
        setCommands([...commands])
    }

    const handleDelete = e => {
        e.preventDefault()
        const id = parseInt(e.target.getAttribute("index"))
        commands.splice(id, 1)
        setCommands([...commands])
    }

    const handleInput = e => {
        e.preventDefault()
        const {id, value} = e.target;
        if (id === "command") {
            setInput((old)=> {return {...old, command: value}})
        }
        else {
            setInput((old)=> {return {...old, description: value}})
        }
    }

    const handleAdd = e => {
        e.preventDefault()
        setCommands(old => {return [...old, {command: input.command, description: input.description}]})
        setInput(base);
    }

    useEffect(()=> {
        updateParent();
    }, [commands])
    
    return (
        <div class="command-component">
            <div class="command-display">
                {commands.map((element, index) => {
                    return (
                        <div class="command-val">
                        {command}: <input index={index} marker="command" value={element.command} onChange={handleEdit} />
                        | 
                        {description}: <input index={index}  value={element.description} onChange={handleEdit}/>
                        <button onClick={handleDelete}> Delete </button>
                        </div>
                    )
                })}
            </div>

            <div class="command-add">
                {command} : <input value={input.command} id="command" onChange={handleInput}/>
                |
                {description} : <input value={input.description} id="description" onChange={handleInput}/>
                <button onClick={handleAdd}> Add </button>
            </div>


        </div>
    )
}
