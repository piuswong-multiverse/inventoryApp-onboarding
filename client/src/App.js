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
    
    return(
        <div>
            <Header />
            <main>
                <Operations />
                <Display 
                    view = {view}
                    setView = {setView}
                />
            </main>
        </div>
    );

};

export default App;