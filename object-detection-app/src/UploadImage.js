import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './MainPage.css';

const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setResult(null);  // Clear previous result when a new file is selected
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async () => {
            const base64Image = reader.result.split(',')[1];

            try {
                const response = await axios({
                    method: 'POST',
                    url: 'https://detect.roboflow.com/hard-hat-sample-s1amk/3',
                    params: {
                        api_key: 'FijZbvnCkL57glv5WoXl'
                    },
                    data: base64Image,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                setResult(response.data);
            } catch (error) {
                console.error("There was an error!", error);
            }
        };
    };

    useEffect(() => {
        if (result && canvasRef.current && imageRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            const image = imageRef.current;

            // Clear previous drawings
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the image on the canvas
            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0, canvas.width, canvas.height);

                // Draw bounding boxes
                result.predictions.forEach(prediction => {
                    const x1 = prediction.x - prediction.width / 2;
                    const y1 = prediction.y - prediction.height / 2;
                    const x2 = prediction.x + prediction.width / 2;
                    const y2 = prediction.y + prediction.height / 2;

                    context.beginPath();
                    context.rect(x1, y1, x2 - x1, y2 - y1);
                    context.lineWidth = 2;
                    context.strokeStyle = 'red';
                    context.stroke();
                    context.closePath();
                });
            };
        }
    }, [result]);

    return (
        <div>
            <input className='image-select' type="file" onChange={handleFileChange} />
            <button className='image-upload' onClick={handleUpload}>Upload and Detect Objects</button>
            <div className='upload-and-image'>
                <div className='image-div'>
                    {selectedFile && <img ref={imageRef} src={URL.createObjectURL(selectedFile)} alt="Selected" style={{ display: 'none' }} />}
                    <canvas ref={canvasRef}></canvas>
                </div>
                {result && 
                <div className='json-div'>
                    <h2>Detection Result:</h2>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>}
            </div>
        </div>
    );
};

export default UploadImage;
