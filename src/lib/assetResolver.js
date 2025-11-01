// Import all assets from src/assets using Vite's glob import
// Note: glob paths in Vite are relative to the project root
const assetModules = import.meta.glob('../assets/**/*.{jpg,jpeg,png,gif,webp,svg}', {
  eager: true,
  import: 'default',
});

/**
 * Resolves an asset path from config.json to the actual imported asset
 * Handles both local assets (from src/assets) and remote URLs
 * @param {string} path - Path from config.json (e.g., "/assets/GNT04463.jpg" or "https://...")
 * @returns {string} - Resolved path that can be used in img src
 */
export function resolveAsset(path) {
  // If it's a remote URL, return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // For local assets, extract the filename from paths like "/assets/GNT04463.jpg"
  const filename = path.replace(/^\/assets\//, '');
  
  // Try to find the asset in our imported modules
  // The glob creates paths like "../assets/GNT04463.jpg"
  const assetPath = `../assets/${filename}`;
  
  // Find the matching asset in our imported modules
  const resolved = assetModules[assetPath];
  
  if (resolved) {
    return resolved;
  }

  // If not found in src/assets, try as public asset path
  // This handles cases where assets might be in public folder
  return path;
}

