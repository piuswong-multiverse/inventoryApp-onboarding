import React from 'react';

const Operations = ( { view, setView } ) => {

    return(
        <div className = "operations">

            <div className = "select-view">
                <button onClick={() => { setView("summary") } }>
                    All Items, Summary
                </button>
                <button onClick={() => { setView("all") } }>
                    All Items, Details
                </button>
                <button onClick={() => { setView("add") }}>
                    Add New Item
                </button>
            </div>
    
            { view==="add" ?
                <div className = "create-item">
                    <form> 
                        <label>
                            <div className="form-heading">Name:</div>
                            <input type="text" id="name" />
                        </label>
                        <label>
                            <div className="form-heading">Description:</div>
                            <textarea defaultValue={""} id="description" />
                        </label>
                        <label>
                            <div className="form-heading">Price ($):</div>
                            <input type="number" id="price" min="0.01" step="0.01" />
                        </label>
                        <label>
                            <div className="form-heading">Image URL:</div>
                            <input type="url" id="imageUrl" />
                        </label>
                        <div>
                            <button type="submit" value="Submit">
                                Submit New Item!
                            </button>
                        </div>
                    </form>
                </div>
                : null
            }   

            <div>
                TODO: more buttons to click -- update, delete
            </div>

        </div>
    );
}

export default Operations