// netlify-functions/getAssets.js
const fs = require('fs');
const path = require('path');

// Determine the path to the static assets directory relative to the function's execution path.
// When deployed on Netlify, the static files are generally accessible via a relative path 
// based on the build environment, but reading them directly can be tricky.
// The most reliable way is often to use a known path relative to the function's executable.
// NOTE: For local Netlify CLI testing, you may need to adjust the __dirname logic.
const ASSETS_PATH = path.join(process.cwd(), 'assets'); 

/**
 * Helper to determine file type from extension.
 * @param {string} filename 
 * @returns {string} The capitalized file extension.
 */
function getFileType(filename) {
    const ext = path.extname(filename).toUpperCase().replace('.', '');
    return ext || 'FILE';
}

