import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import QuestionList from "./QuestionList"

const Welcome = () => {
    return(
        <div className="container">
            <h1>
                Ask Your Questions
            </h1>
            <p className = "lead"> Welcome to AYQ Forum </p>
            <QuestionList />
        </div>
    )
}


const root = ReactDOM.createRoot(document.getElementById('welcome'))
root.render(
    <React.StrictMode>
        <Welcome />
    </React.StrictMode>
    
)

export default Welcome