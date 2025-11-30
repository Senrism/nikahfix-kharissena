import { useState, useEffect } from 'react';
import './App.css';
import UserWatch from './components/section/user-watch';
import Thumbnail from './components/section/thumbnail';
import NetflixIntro from './components/section/netflix-intro';
import { preloadAllAssets } from './lib/preloadImages';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [showNetflixIntro, setShowNetflixIntro] = useState(true);
  const [assetsPreloaded, setAssetsPreloaded] = useState(false);

  // Preload all assets (images and videos) when the app mounts
  useEffect(() => {
    preloadAllAssets().then(() => {
      setAssetsPreloaded(true);
    });
  }, []);

  const handleNetflixIntroComplete = () => {
    setShowNetflixIntro(false);
  };

  return (
    <div className="bg-black text-white min-h-screen force-mobile">
      {showNetflixIntro && assetsPreloaded ? (
        <NetflixIntro onComplete={handleNetflixIntroComplete} />
      ) : assetsPreloaded ? (
        isLogin ? (
          <div className="container">
            <Thumbnail />
          </div>
        ) : (
          <div className="max-w-sm container">
            <UserWatch
              onClick={() => {
                setIsLogin(true);
              }}
            />
          </div>
        )
      ) : (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
          <div className="text-white text-xl">Tunggu yaa undangan sedang di download...</div>
        </div>
      )}
    </div>
  );
}

export default App;
