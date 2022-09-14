import React from 'react';
import AddItem from './AddItem';

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
    
            <div>
                TODO: more buttons to click -- update, delete
            </div>

            { view==="add" ?
                <AddItem 
                    setView = {setView}
                />
                : null
            }   

        </div>
    );
}

export default Operations