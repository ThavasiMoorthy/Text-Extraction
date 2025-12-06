import React, { useCallback } from 'react';

const FileUpload = ({ onFileUpload }) => {
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            onFileUpload(files[0]);
        }
    }, [onFileUpload]);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileUpload(e.target.files[0]);
        }
    };

    return (
        <div
            className="upload-container"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
                padding: '20px',
                border: '2px dashed #ffffff',
                borderRadius: '10px',
                textAlign: 'center',
                color: 'white',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(5px)',
                cursor: 'pointer'
            }}
        >
            <input
                type="file"
                id="fileInput"
                onChange={handleChange}
                style={{ display: 'none' }}
            />
            <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                <h3>Drag & Drop or Click to Upload</h3>
                <p>Supports PDF, DOCX, PPT, TXT, Images</p>
            </label>
        </div>
    );
};

export default FileUpload;
