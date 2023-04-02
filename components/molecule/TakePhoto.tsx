import React, { useState, useRef } from 'react';
import { getPhotoInformations } from '../../lib/photoAnalyzer';

const TakePhoto: React.FC = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [photoPath, setPhotoPath] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

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
            setSelectedImage(null);
        }
    };

    const handleTakePhotoClick = async () => {
        if (videoRef && canvasRef.current) {
            const video = videoRef;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            const fileName = 'photo.png';
            if (context) {
                context.drawImage(video, 0, 0);
                canvas.toBlob(async (blob) => {
                    if (blob !== null) {
                        const dataUrl = URL.createObjectURL(blob);
                        const file = new File([blob], fileName, { type: blob.type });
                        setSelectedImage(file);
                        const photoInformations = await getPhotoInformations(file);
                        console.log(photoInformations);
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
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center' }}>Camera Example</h1>
            {stream ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <video autoPlay ref={handleVideoRef} style={{ marginBottom: '20px' }} />
                    <canvas style={{ display: 'none' }} ref={canvasRef} />
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <button onClick={handleTakePhotoClick} style={{ marginRight: '10px' }}>
                            Take Photo
                        </button>
                        <button onClick={handleStopClick}>Stop</button>
                    </div>
                    {photoPath && (
                        <div style={{ textAlign: 'center' }}>
                            <a href={photoPath} download="photo.png">
                                Download Photo
                            </a>
                        </div>
                    )}
                </div>
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <button onClick={handleStartClick}>Start Camera</button>
                </div>
            )}
        </div>
    )
};
export default TakePhoto; 