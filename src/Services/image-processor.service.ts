import { Injectable } from '@angular/core';
import init, {  apply_grayscale } from '../assets/wasm/image_editor_backend.js';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessorService {
  // private processor: ImageProcessor | null = null;
  private initialized = false;

  constructor() {
    this.initWasm();
  }

  private async initWasm() {
    try {
      console.log('Initializing WASM module...');
      await init('../assets/wasm/image_editor_backend_bg.wasm');
      this.initialized = true;
      console.log('WASM module initialized successfully');
    } catch (error) {
      console.error('Failed to initialize WASM module:', error);
      throw error;
    }
  }

  async applyGrayscale(imageData: ImageData, width: number, height: number): Promise<ImageData> {
    try {
      console.log('Applying grayscale with dimensions:', width, 'x', height);
      console.log('Input image buffer length:', imageData.data.length);

      // Create a Uint8Array from the ImageData buffer.
      const uint8Array = new Uint8Array(imageData.data.buffer);

      // Call the new WASM function.
      const processed = apply_grayscale(uint8Array, width, height);
      console.log('Processed buffer length:', processed.length);

      // Validate the output length.
      const expectedLength = width * height * 4;
      if (processed.length !== expectedLength) {
        throw new Error(`Output size mismatch. Expected ${expectedLength}, got ${processed.length}`);
      }

      // Create a new ImageData object from the processed data.
      const newImageData = new ImageData(new Uint8ClampedArray(processed), width, height);
      console.log('New ImageData created successfully with dimensions:', width, 'x', height);
      return newImageData;
    } catch (error) {
      console.error('Failed to process image with dimensions:', error);
      throw error;
    }
  }
}