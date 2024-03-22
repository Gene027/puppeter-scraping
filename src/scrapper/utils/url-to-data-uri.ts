import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp = require('sharp');
// const fetch = require('node-fetch');

export async function convertImageUrlToBase64(url: string): Promise<string> {
  try {
    const response = await axios({
      method: 'get',
      url,
      responseType: 'arraybuffer',
    });

    const imageBuffer = await sharp(response.data).toBuffer();
    const base64Image = imageBuffer.toString('base64');

    const mimeType = 'image/jpeg'; // Assuming the image is a JPEG;
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    return dataUrl;
  } catch (error) {
    console.error('Error converting image to Base64:', error);
  }
}


// async function convertImageUrlToBase64(url) {
//   try {
//     const response = await fetch(url);
//     const buffer = await response.buffer(); // Get a Buffer of the image data
//     const base64 = buffer.toString('base64'); // Convert the Buffer to a Base64 string
//     return `data:${response.headers.get('content-type')};base64,${base64}`;
//   } catch (error) {
//     console.error('Error converting image to Base64:', error);
//     return null; // Or handle the error as needed
//   }
// }

