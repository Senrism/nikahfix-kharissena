import React, { useRef, useEffect, useState } from 'react';
import NetflixVideo from '../../../assets/Netflix.mp4';

export default function NetflixIntro({ onComplete }) {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      video.play().catch((err) => {
        console.error('Error playing video:', err);
        setHasError(true);
      });
    };

    const handleEnded = () => {
      onComplete();
    };

    const handleError = () => {
      console.error('Error loading video');
      setHasError(true);
      // Still proceed after a delay if video fails to load
      setTimeout(() => {
        onComplete();
      }, 2000);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    // Load the video
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  if (hasError) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <p className="text-white mb-4">Video failed to load</p>
          <button
            onClick={handleSkip}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        muted
        playsInline
        autoPlay
      >
        <source src={NetflixVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button
        onClick={handleSkip}
        className="absolute top-4 right-4 px-4 py-2 bg-black bg-opacity-50 text-white rounded hover:bg-opacity-70 transition-opacity"
        aria-label="Skip intro"
      >
        Skip
      </button>
    </div>
  );
}

