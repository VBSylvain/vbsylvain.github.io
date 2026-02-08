const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, '../img/profile2023.jpg');
const outputWebP = path.join(__dirname, '../img/profile2023.webp');
const outputJpg = path.join(__dirname, '../img/profile2023-sm.jpg');

async function optimize() {
    try {
        console.log(`Processing ${inputFile}...`);

        // Create WebP version
        await sharp(inputFile)
            .resize(320, 320, {
                fit: 'cover',
                position: 'top' // Focus on the top part often works better for portraits if cropped
            })
            .webp({ quality: 80 })
            .toFile(outputWebP);

        console.log(`Created ${outputWebP}`);

        // Create resized JPEG version
        await sharp(inputFile)
            .resize(320, 320, {
                fit: 'cover',
                position: 'top'
            })
            .jpeg({ quality: 80, mozjpeg: true })
            .toFile(outputJpg);

        console.log(`Created ${outputJpg}`);

    } catch (error) {
        console.error('Error optimizing image:', error);
        process.exit(1);
    }
}

optimize();
