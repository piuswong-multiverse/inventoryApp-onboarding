import React from 'react';

const Operations = ( { setView } ) => {

    return(
        <div className = "operations">
            <div className = "select-view">
                <div>
                    View:
                </div> 
                <button onClick={() => { setView("summary") } }>
                    All Items, Summary
                </button>
                <button onClick={() => { setView("all") } }>
                    All Items, Details
                </button>
            </div>
    
            <div>
                more buttons to click:  (1) show all, (x) CRUD operations TBD
            </div>

        </div>
    );
}

export default Operations