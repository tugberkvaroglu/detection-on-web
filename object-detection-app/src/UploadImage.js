import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
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

    return (
        <div>
            <h1>Upload an Image</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload and Detect Objects</button>
            {result && <div>
                <h2>Detection Result:</h2>
                <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>}
        </div>
    );
};

export default UploadImage;
