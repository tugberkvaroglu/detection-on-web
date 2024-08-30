import React, { useState } from 'react';
import UploadImage from './UploadImage';
import './MainPage.css';

function App() {
    const [selectedModel, setSelectedModel] = useState('hard-hat');

    const handleModelChange = (model) => {
        setSelectedModel(model);
    };

    const getModelApiUrl = () => {
        switch (selectedModel) {
            case 'hard-hat':
                return 'https://detect.roboflow.com/hard-hat-sample-s1amk/3';
            case 'fruits-and-potato':
                return 'https://detect.roboflow.com/fruits-and-potato/2'; // Replace with actual URL
            default:
                return 'https://detect.roboflow.com/hard-hat-sample-s1amk/3';
        }
    };

    return (
        <div className="App">
            <nav className='top-nav-bar'>
                <button className='first-model-button' onClick={() => handleModelChange('hard-hat')}>HardHat Detection Model</button>
                <button className='second-model-button' onClick={() => handleModelChange('fruits-and-potato')}>fruits-and-potato Model</button>
                <text className='nav-bar-title'>Upload Image</text>
            </nav>
            <UploadImage apiUrl={getModelApiUrl()} />
        </div>
    );
}

export default App;
