import axios from 'axios';
import sharp from 'sharp';

async function convertImageSrcToBase64(url: string): Promise<string> {
  try {
    const response = await axios({
      url,
      responseType: 'arraybuffer',
    });

    const imageBuffer = Buffer.from(response.data, 'binary');
    const base64 = await sharp(imageBuffer)
      .toBuffer()
      .then((buffer) => buffer.toString('base64'));

    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw error;
  }
}

export async function convertAllImagesToBase64(
  urls: string[],
): Promise<string[]> {
  try {
    const base64Images = await Promise.all(
      urls.map((url) => convertImageSrcToBase64(url)),
    );
    return base64Images;
  } catch (error) {
    console.error('Error converting images to base64:', error);
    throw error;
  }
}
