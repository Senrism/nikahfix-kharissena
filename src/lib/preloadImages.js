import data from '../data/config.json';
import { resolveAsset } from './assetResolver';
import NetflixVideo from '../assets/Netflix.mp4';

/**
 * Extracts all image URLs from the config.json file
 * @returns {string[]} Array of image URLs (resolved)
 */
export function extractImageUrls() {
  const imageUrls = [];

  // Add bride and groom photos
  if (data.pegantin?.pria?.foto) {
    imageUrls.push(resolveAsset(data.pegantin.pria.foto));
  }
  if (data.pegantin?.wanita?.foto) {
    imageUrls.push(resolveAsset(data.pegantin.wanita.foto));
  }

  // Add thumbnail image
  if (data.thumbnail_image_url) {
    imageUrls.push(resolveAsset(data.thumbnail_image_url));
  }

  // Add breaking news image
  if (data.breaking_news_img) {
    imageUrls.push(resolveAsset(data.breaking_news_img));
  }

  // Add love story images
  if (data.love_story && Array.isArray(data.love_story)) {
    data.love_story.forEach((item) => {
      if (item.image_url) {
        imageUrls.push(resolveAsset(item.image_url));
      }
    });
  }

  // Add gallery images
  if (data.gallery && Array.isArray(data.gallery)) {
    data.gallery.forEach((imageUrl) => {
      if (imageUrl) {
        imageUrls.push(resolveAsset(imageUrl));
      }
    });
  }

  return imageUrls;
}

/**
 * Preloads all images from config.json
 * @returns {Promise<void>} Promise that resolves when all images are preloaded
 */
export function preloadAllImages() {
  const imageUrls = extractImageUrls();
  
  const preloadPromises = imageUrls.map((url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });

  // Return a promise that resolves when all images are loaded
  // Don't fail if some images fail to load
  return Promise.allSettled(preloadPromises);
}

/**
 * Preloads a video file
 * @param {string} videoUrl - URL of the video to preload
 * @returns {Promise<void>} Promise that resolves when video is loaded
 */
export function preloadVideo(videoUrl) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    
    video.oncanplaythrough = () => {
      resolve();
    };
    
    video.onerror = () => {
      reject(new Error(`Failed to load video: ${videoUrl}`));
    };
    
    video.src = videoUrl;
    video.load();
  });
}

/**
 * Preloads all assets including images and videos
 * @returns {Promise<void>} Promise that resolves when all assets are preloaded
 */
export async function preloadAllAssets() {
  // Preload images
  const imageResults = await preloadAllImages();
  
  // Preload Netflix video
  const videoResults = await Promise.allSettled([
    preloadVideo(NetflixVideo)
  ]);
  
  const allResults = [...imageResults, ...videoResults];
  const successful = allResults.filter((r) => r.status === 'fulfilled').length;
  const failed = allResults.filter((r) => r.status === 'rejected').length;
  
  if (failed > 0) {
    console.warn(`${failed} asset(s) failed to preload, ${successful} succeeded`);
  } else {
    console.log(`All ${successful} assets preloaded successfully`);
  }
  
  return allResults;
}

