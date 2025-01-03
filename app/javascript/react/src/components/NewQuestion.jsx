import React from 'react'
import { useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import ServerSideError from './ServerSideError'

const NewQuestion = () => {
    const questionsTags = [
        { label: 'Ruby', value: 'Ruby'},
        { label: 'React', value: 'React'},
        { label: 'Rails', value: 'Rails'},
        { label: 'Javascript', value: 'Javascript'},
        { label: 'Bootstrap', value: 'Bootstrap'},
        { label: 'Data Structure', value: 'Data Structure'}
       ] 
    
    // const [title, setTitle] = useState('')
    // const [tag, setTag] = useState(questionsTags[0].value)
    // const handleTitleChange = (event) => {
    //     setTitle(event.target.value)
    // }
    // const handleTagChange = (event) => {
    //     setTag(event.target.value)
    // }
    const [isServerSideError, setIsServerSideError] = useState(false);
    const [serverErrors, setServerErrors] = useState([]);
    const [formField, setFormField] = useState({
        title: '', 
        tag: questionsTags[0].value
    })
    const handleFormFields = (event) => {
        setFormField({ ...formField, [event.target.name]: event.target.value})
    }
    const handleQuestionSubmit = (event) => {
        event.preventDefault();
        console.log(formField)
        createQuestion(formField)
    }

    const createQuestion = (data) =>{
        fetch(`/api/v1/questions`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success: ', data)
            if(data['status'] === "failure"){
                setIsServerSideError(true)
                setServerErrors(data['data'])
            }else{
                setIsServerSideError(false)
                setServerErrors([])
            }
        })
        .catch((error)=>{
            console.log('Error: ', error)
        })
    }
    return(
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Ask a Question</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleQuestionSubmit}>
                        <div className="modal-body">
                            {isServerSideError && <ServerSideError errors={serverErrors}/>}
                            <div className="form-group">
                                <label className="form-label mt-3 mb-3">Title</label>
                                <input type="text" className="form-control form-control-lg rounded-0" value={formField.title} 
                                onChange={event => handleFormFields(event)} name="title"/>
                            </div>

                            <div className="form-group">
                                <label className="form-label mt-3 mb-3">Select the Question Tag</label>
                                <select className="form-select form-select-lg rounded-0" value={formField.tag}
                                 onChange={event =>handleFormFields(event)} name="tag">
                                    {questionsTags.map(tag => (
                                        <option key={tag.value} value={tag.value}>{tag.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Submit Question</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export default NewQuestion