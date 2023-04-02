import React, { useState, useRef } from 'react';

const TakePhoto: React.FC = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [photoPath, setPhotoPath] = useState<string | null>(null);

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
            setPhotoPath(null);
            setVideoRef(null);
        }
    };

    const handleTakePhotoClick = () => {
        if (videoRef && canvasRef.current) {
            const video = videoRef;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0);
                canvas.toBlob((blob) => {
                    if (blob !== null) {
                        const dataUrl = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = dataUrl;
                        a.download = 'photo.png';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        setPhotoPath(a.href);
                    }
                }, 'image/png');
            }
        }
    };

    const handleVideoRef = (video: HTMLVideoElement | null) => {
        if (video) {
            video.srcObject = stream;
            setVideoRef(video);
        }
    };

    return (
        <div>
            <h1>Camera Example</h1>
            {stream ? (
                <>
                    <video autoPlay ref={handleVideoRef} />
                    <canvas style={{ display: 'none' }} ref={canvasRef} />
                    <button onClick={handleTakePhotoClick}>Take Photo</button>
                    <button onClick={handleStopClick}>Stop</button>
                    {photoPath && <div>{photoPath}</div>}
                </>
            ) : (
                <button onClick={handleStartClick}>Start</button>
            )}
        </div>
    );
};

export default TakePhoto;
