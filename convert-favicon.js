const fs = require('fs');
const path = require('path');
const pngToIco = require('png-to-ico');

// Define paths
const inputPath = path.join(__dirname, 'public', 'images', 'gcc-logo.png');
const outputPath = path.join(__dirname, 'public', 'favicon.ico');

// Convert PNG to ICO
async function convertToIco() {
  try {
    console.log('Converting PNG to ICO format...');
    
    // Create ico with multiple sizes
    const buffer = await pngToIco([inputPath]);
    
    // Write the ico file
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ Successfully created favicon.ico at ${outputPath}`);
  } catch (error) {
    console.error('Error converting image:', error);
  }
}

convertToIco(); 