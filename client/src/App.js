import React from 'react';
// import components
import Header from './components/Header';
import Operations from './components/Operations';
import Display from './components/Display';

// Display app
const App = () => {

    return(
        <div>
            <Header />
            <Operations />
            <Display />
        </div>
    );

};

export default App;