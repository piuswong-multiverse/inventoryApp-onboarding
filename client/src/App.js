import React, { useState } from 'react';
// import components
import Header from './components/Header';
import Operations from './components/Operations';
import Display from './components/Display';
// import styles
import './App.css';

// Display app
const App = () => {

    const [view, setView] = useState("summary"); // views: summary, all, one, add
    const [itemToEdit, setItemToEdit] = useState({}); // only used for update/modify/edit functionality
    
    return(
        <div>
            <Header />
            <main>
                <Operations 
                    view = {view}
                    setView = {setView}
                    itemToEdit = {itemToEdit}
                    setItemToEdit = {setItemToEdit}
                />
                <Display 
                    view = {view}
                    setView = {setView}
                    setItemToEdit = {setItemToEdit}
                />
            </main>
        </div>
    );

};

export default App;