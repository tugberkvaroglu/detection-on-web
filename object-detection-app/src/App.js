import React from 'react';
import UploadImage from './UploadImage';
import './MainPage.css'

function App() {
    return (
        <div className="App">
            <nav className='top-nav-bar'>
                <button className='first-model-button' >First Model</button>
                <button className='second-model-button' >Second Model</button>
                <text className='nav-bar-title'>Upload Image</text>
            </nav>
            <UploadImage />
        </div>
    );
}

export default App;
