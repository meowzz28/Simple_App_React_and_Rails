import * as React from 'react'
import * as ReactDOM from 'react-dom'

const EmptyQuestionMessage = (props) =>{
    return (
        <div>
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>OOPS!</strong> No questions found with the tag:{props.tagname}.Please select another option.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    )
}

export default EmptyQuestionMessage