import React, {useState} from 'react'
import './FAQ.css'

export default function FAQ() {

    const base = {question: "", answer: ""};
    const [questions, setQuestions] = useState([])
    const [input, setInput] = useState(base)

    const handleEdit = e => {
        e.preventDefault()
        const {value} = e.target;
        const id = parseInt(e.target.getAttribute("index"))
        const type = e.target.getAttribute("marker")
        if (type === "question") {
            questions[id].question = value
        }
        else {
            questions[id].answer = value
        }
        setQuestions([...questions])
    }

    const handleDelete = e => {
        e.preventDefault()
        const {key} = e.target;
        questions.splice(key, 1)
        setQuestions([...questions])
    }

    const handleInput = e => {
        e.preventDefault()
        const {id, value} = e.target;
        if (id === "question") {
            setInput((old)=> {return {...old, question: value}})
        }
        else {
            setInput((old)=> {return {...old, answer: value}})
        }
    }

    const handleAdd = e => {
        e.preventDefault()
        setQuestions(old => {return [...old, {question: input.question, answer: input.answer}]})
        setInput(base);
    }
    
    return (
        <div class="faq-component">
            <div class="faq-display">
                {questions.map((element, index) => {
                    return (
                        <>
                        Question: <input index={index} marker="question" value={element.question} onChange={handleEdit} />
                        | 
                        Answer: <input index={index}  value={element.answer} onChange={handleEdit}/>
                        <button onClick={handleDelete}> Delete </button>
                        </>
                    )
                })}
            </div>

            <div class="faq-add">
                Question: <input value={input.question} id="question" onChange={handleInput}/>
                |
                Answer: <input value={input.answer} id="answer" onChange={handleInput}/>
                <button onClick={handleAdd}> Add </button>
            </div>


        </div>
    )
}
