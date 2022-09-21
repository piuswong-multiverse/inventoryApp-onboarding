import React from 'react';
import AddOrUpdateItem from './AddOrUpdateItem';

const Operations = ( { view, setView, itemToEdit } ) => {

    return(
        <div className = "operations">

            <div className = "select-view">
                <button onClick={() => { setView("summary") } }>
                    All Items, Summary
                </button>
                <button onClick={() => { setView("all") } }>
                    All Items, Details
                </button>
                { view!=="update" ?
                    <button onClick={() => { 
                        setView("add");
                        }}>
                        Add New Item
                    </button> : null
                }
            </div>
    
            <div>
                TODO: more buttons to click -- update, delete
            </div>

            { view==="add" ?
                <AddOrUpdateItem 
                    view = {view}
                    setView = {setView}
                /> 
                : view==="update" ?
                <AddOrUpdateItem 
                    view = {view}
                    setView = {setView}
                    itemToEdit = {itemToEdit}
                />
                : null
            }   

        </div>
    );
}

export default Operations