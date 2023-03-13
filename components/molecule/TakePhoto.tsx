import React, { useState } from 'react';

const TakePhoto: React.FC = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);

    const handleStartClick = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(stream);
        } catch (err) {
            console.error('Error accessing camera', err);
        }
    };

    const handleStopClick = () => {
        if (stream) {
            stream.getTracks().forEach((track) => {
                track.stop();
            });
            setStream(null);
        }
    };

    return (
        <div>
            <h1>Camera Example</h1>
            {stream ? (
                <>
                    <video autoPlay ref={(video) => video && (video.srcObject = stream)} />
                    <button onClick={handleStopClick}>Stop</button>
                </>
            ) : (
                <button onClick={handleStartClick}>Start</button>
            )}
        </div>
    );
};

export default TakePhoto;