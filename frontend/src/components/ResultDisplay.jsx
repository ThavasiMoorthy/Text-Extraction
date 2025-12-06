import React from 'react';

const ResultDisplay = ({ text, loading }) => {
    if (loading) {
        return (
            <div className="result-container" style={{ color: 'white', marginTop: '20px' }}>
                <h3>Extracting...</h3>
            </div>
        );
    }

    if (!text) return null;

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "extracted_text.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="result-container" style={{
            marginTop: '20px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '10px',
            maxHeight: '400px',
            overflowY: 'auto',
            color: 'black',
            whiteSpace: 'pre-wrap',
            position: 'relative'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ margin: 0 }}>Extracted Text:</h3>
                <button
                    onClick={handleDownload}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Download Text
                </button>
            </div>
            <p>{text}</p>
        </div>
    );
};

export default ResultDisplay;
