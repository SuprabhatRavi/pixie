import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { fabric } from 'fabric-pure-browser';
import { ImageProcessorService } from '../../Services/image-processor.service';

@Component({
  selector: 'app-image-editor',
  imports: [CommonModule],
  providers: [ImageProcessorService],
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss']
})
// export class ImageEditorComponent implements OnInit {
//   private canvas: fabric.Canvas;
//   document: Document = document;
//   private isDragging = false;
//   private currentX = 0;
//   private currentY = 0;
//   private initialX = 0;
//   private initialY = 0;
//   private xOffset = 0;
//   private yOffset = 0;

//   isDrawingMode = false;
//   brushSize = 5;
//   brushColor = '#000000';

//   constructor(private imageProcessorService: ImageProcessorService) {}

//   async ngOnInit() {
//     // Initialize canvas with window dimensions
//     this.initCanvas();
    
//     // Handle window resize
//     window.addEventListener('resize', () => {
//       this.resizeCanvas();
//     });
    
//     const toolbar = document.querySelector('.floating-toolbar') as HTMLElement;
//     if (toolbar) {
//       toolbar.addEventListener('mousedown', (e) => this.dragStart(e));
//       toolbar.addEventListener('mousemove', (e) => this.drag(e));
//       toolbar.addEventListener('mouseup', () => this.dragEnd());
//       toolbar.addEventListener('mouseleave', () => this.dragEnd());
//     }
    
//     await this.imageProcessorService.initialize(this.canvas.width!, this.canvas.height!);
//   }

//   private initCanvas() {
//     this.canvas = new fabric.Canvas('canvas', {
//       width: window.innerWidth,
//       height: window.innerHeight,
//       isDrawingMode: false
//     });
    
//     // Initialize drawing brush
//     this.canvas.freeDrawingBrush.width = this.brushSize;
//     this.canvas.freeDrawingBrush.color = this.brushColor;
//   }

//   triggerFileInput() {
//     document.getElementById('imageUpload')?.click();
//   }

//   private resizeCanvas() {
//     this.canvas.setWidth(window.innerWidth);
//     this.canvas.setHeight(window.innerHeight);
//     this.canvas.renderAll();
//   }

//   addRectangle() {
//     const rect = new fabric.Rect({
//       left: 100,
//       top: 100,
//       fill: '#f00',
//       width: 100,
//       height: 100
//     });
//     this.canvas.add(rect);
//   }

//   addCircle() {
//     const circle = new fabric.Circle({
//       left: 100,
//       top: 100,
//       fill: '#00f',
//       radius: 50
//     });
//     this.canvas.add(circle);
//   }

//   addText() {
//     const text = new fabric.Text('Hello World', {
//       left: 100,
//       top: 100,
//       fontSize: 24
//     });
//     this.canvas.add(text);
//   }

//   deleteSelected() {
//     const activeObject = this.canvas.getActiveObject();
//     if (activeObject) {
//       this.canvas.remove(activeObject);
//     }
//   }

//   onImageUpload(event: any) {
//     const file = event.target.files[0];
//     const reader = new FileReader();
    
//     reader.onload = (e: any) => {
//       fabric.Image.fromURL(e.target.result, (img) => {
//         // Scale image to fit canvas
//         const scale = Math.min(
//           this.canvas.width! / img.width!,
//           this.canvas.height! / img.height!
//         );
//         img.scale(scale);
//         this.canvas.add(img);
//       });
//     };
    
//     reader.readAsDataURL(file);
//   }

//   private dragStart(e: MouseEvent) {
//     const toolbar = e.target as HTMLElement;
//     if (toolbar.closest('.toolbar-handle')) {
//       this.initialX = e.clientX - this.xOffset;
//       this.initialY = e.clientY - this.yOffset;
//       this.isDragging = true;
//     }
//   }

//   private drag(e: MouseEvent) {
//     if (this.isDragging) {
//       e.preventDefault();
//       this.currentX = e.clientX - this.initialX;
//       this.currentY = e.clientY - this.initialY;
//       this.xOffset = this.currentX;
//       this.yOffset = this.currentY;

//       const toolbar = document.querySelector('.floating-toolbar') as HTMLElement;
//       if (toolbar) {
//         toolbar.style.transform = 
//           `translate(${this.currentX}px, ${this.currentY}px)`;
//       }
//     }
//   }

//   private dragEnd() {
//     this.initialX = this.currentX;
//     this.initialY = this.currentY;
//     this.isDragging = false;
//   }

//   toggleDrawingMode() {
//     this.isDrawingMode = !this.isDrawingMode;
//     this.canvas.isDrawingMode = this.isDrawingMode;
//     if (this.isDrawingMode) {
//       this.canvas.freeDrawingBrush.width = this.brushSize;
//       this.canvas.freeDrawingBrush.color = this.brushColor;
//     }
//   }

//   updateBrushSize(event: Event) {
//     const size = +(event.target as HTMLInputElement).value;
//     this.brushSize = size;
//     if (this.canvas.isDrawingMode) {
//       this.canvas.freeDrawingBrush.width = size;
//     }
//   }

//   updateBrushColor(event: Event) {
//     const color = (event.target as HTMLInputElement).value;
//     this.brushColor = color;
//     if (this.canvas.isDrawingMode) {
//       this.canvas.freeDrawingBrush.color = color;
//     }
//   }

//   clearCanvas() {
//     this.canvas.clear();
//   }

//   async applyGrayscaleEffect() {
//     // Get the active object (assuming it's an image)
//     const activeObject = this.canvas.getActiveObject();
//     if (!activeObject || !(activeObject instanceof fabric.Image)) {
//       console.warn('Please select an image first');
//       return;
//     }
  
//     // Create a temporary canvas matching the image dimensions
//     const tempCanvas = document.createElement('canvas');
//     tempCanvas.width = activeObject.width! * activeObject.scaleX!;
//     tempCanvas.height = activeObject.height! * activeObject.scaleY!;
//     const tempCtx = tempCanvas.getContext('2d');
  
//     // Draw only the image to the temp canvas
//     tempCtx!.drawImage(
//       activeObject.getElement(),
//       0,
//       0,
//       tempCanvas.width,
//       tempCanvas.height
//     );
  
//     // Get image data from temp canvas
//     const imageData = tempCtx!.getImageData(
//       0,
//       0,
//       tempCanvas.width,
//       tempCanvas.height
//     );
  
//     try {
//       const processed = await this.imageProcessorService.applyGrayscale(imageData);
//       console.log("processed image here ", processed);
      
//       // Put the processed data back to temp canvas
//       tempCtx!.putImageData(processed, 0, 0);
      
//       // Create a new fabric.Image from the processed canvas
//       fabric.Image.fromURL(tempCanvas.toDataURL(), (img) => {
//         // Maintain the original position and scale
//         img.set({
//           left: activeObject.left,
//           top: activeObject.top,
//           scaleX: activeObject.scaleX,
//           scaleY: activeObject.scaleY,
//           angle: activeObject.angle,
//           flipX: activeObject.flipX,
//           flipY: activeObject.flipY
//         });
        
//         // Replace the old image with the new one
//         this.canvas.remove(activeObject);
//         this.canvas.add(img);
//         this.canvas.setActiveObject(img);
//         this.canvas.renderAll();
//       });
//     } catch (error) {
//       console.error('Error applying grayscale effect:', error);
//     }
//   }

//   ngOnDestroy() {
//     window.removeEventListener('resize', this.resizeCanvas);

//     const toolbar = document.querySelector('.floating-toolbar') as HTMLElement;
//     if (toolbar) {
//       toolbar.removeEventListener('mousedown', (e) => this.dragStart(e));
//       toolbar.removeEventListener('mousemove', (e) => this.drag(e));
//       toolbar.removeEventListener('mouseup', () => this.dragEnd());
//       toolbar.removeEventListener('mouseleave', () => this.dragEnd());
//     }
//   }
// }
export class ImageEditorComponent implements OnInit, OnDestroy {
  private canvas: fabric.Canvas;
  document: Document = document;
  private isDragging = false;
  private currentX = 0;
  private currentY = 0;
  private initialX = 0;
  private initialY = 0;
  private xOffset = 0;
  private yOffset = 0;

  isDrawingMode = false;
  brushSize = 5;
  brushColor = '#000000';

  constructor(private imageProcessorService: ImageProcessorService) {}

  async ngOnInit() {
    // Initialize canvas with window dimensions
    this.initCanvas();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
    
    const toolbar = document.querySelector('.floating-toolbar') as HTMLElement;
    if (toolbar) {
      toolbar.addEventListener('mousedown', (e) => this.dragStart(e));
      toolbar.addEventListener('mousemove', (e) => this.drag(e));
      toolbar.addEventListener('mouseup', () => this.dragEnd());
      toolbar.addEventListener('mouseleave', () => this.dragEnd());
    }
    
    // await this.imageProcessorService.initialize(this.canvas.width!, this.canvas.height!);
  }

  private initCanvas() {
    this.canvas = new fabric.Canvas('canvas', {
      width: window.innerWidth,
      height: window.innerHeight,
      isDrawingMode: false
    });
    
    // Initialize drawing brush
    this.canvas.freeDrawingBrush.width = this.brushSize;
    this.canvas.freeDrawingBrush.color = this.brushColor;
  }

  triggerFileInput() {
    document.getElementById('imageUpload')?.click();
  }

  private resizeCanvas() {
    this.canvas.setWidth(window.innerWidth);
    this.canvas.setHeight(window.innerHeight);
    this.canvas.renderAll();
  }

  addRectangle() {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: '#f00',
      width: 100,
      height: 100
    });
    this.canvas.add(rect);
  }

  addCircle() {
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      fill: '#00f',
      radius: 50
    });
    this.canvas.add(circle);
  }

  addText() {
    const text = new fabric.Text('Hello World', {
      left: 100,
      top: 100,
      fontSize: 24
    });
    this.canvas.add(text);
  }

  deleteSelected() {
    const activeObject = this.canvas.getActiveObject();
    if (activeObject) {
      this.canvas.remove(activeObject);
    }
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      fabric.Image.fromURL(e.target.result, (img) => {
        // Scale image to fit canvas
        const scale = Math.min(
          this.canvas.width! / img.width!,
          this.canvas.height! / img.height!
        );
        img.scale(scale);
        this.canvas.add(img);
        // Optionally, set the uploaded image as the active object so it can be processed.
        this.canvas.setActiveObject(img);
      });
    };
    
    reader.readAsDataURL(file);
  }

  private dragStart(e: MouseEvent) {
    const toolbar = e.target as HTMLElement;
    if (toolbar.closest('.toolbar-handle')) {
      this.initialX = e.clientX - this.xOffset;
      this.initialY = e.clientY - this.yOffset;
      this.isDragging = true;
    }
  }

  private drag(e: MouseEvent) {
    if (this.isDragging) {
      e.preventDefault();
      this.currentX = e.clientX - this.initialX;
      this.currentY = e.clientY - this.initialY;
      this.xOffset = this.currentX;
      this.yOffset = this.currentY;

      const toolbar = document.querySelector('.floating-toolbar') as HTMLElement;
      if (toolbar) {
        toolbar.style.transform = 
          `translate(${this.currentX}px, ${this.currentY}px)`;
      }
    }
  }

  private dragEnd() {
    this.initialX = this.currentX;
    this.initialY = this.currentY;
    this.isDragging = false;
  }

  toggleDrawingMode() {
    this.isDrawingMode = !this.isDrawingMode;
    this.canvas.isDrawingMode = this.isDrawingMode;
    if (this.isDrawingMode) {
      this.canvas.freeDrawingBrush.width = this.brushSize;
      this.canvas.freeDrawingBrush.color = this.brushColor;
    }
  }

  updateBrushSize(event: Event) {
    const size = +(event.target as HTMLInputElement).value;
    this.brushSize = size;
    if (this.canvas.isDrawingMode) {
      this.canvas.freeDrawingBrush.width = size;
    }
  }

  updateBrushColor(event: Event) {
    const color = (event.target as HTMLInputElement).value;
    this.brushColor = color;
    if (this.canvas.isDrawingMode) {
      this.canvas.freeDrawingBrush.color = color;
    }
  }

  clearCanvas() {
    this.canvas.clear();
  }

  async applyGrayscaleEffect() {
    const activeObject = this.canvas.getActiveObject();
    if (!activeObject || activeObject.type !== 'image') {
      console.error('Please select an image to apply the grayscale effect.');
      return;
    }
    const fabricImage = activeObject as fabric.Image;
    const imageElement = fabricImage.getElement() as HTMLImageElement;
  
    // Use the image’s natural dimensions.
    const origWidth = imageElement.naturalWidth;
    const origHeight = imageElement.naturalHeight;
  
    const offscreen = document.createElement('canvas');
    offscreen.width = origWidth;
    offscreen.height = origHeight;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) {
      console.error('Could not get offscreen canvas context.');
      return;
    }
    
    offCtx.drawImage(imageElement, 0, 0, origWidth, origHeight);
    const imageData = offCtx.getImageData(0, 0, origWidth, origHeight);
    
    try {
      // Call the new Rust function with dimensions.
      const processedData = await this.imageProcessorService.applyGrayscale(imageData, origWidth, origHeight);
      
      offCtx.putImageData(processedData, 0, 0);
      const dataUrl = offscreen.toDataURL();
      
      // Save the current scale to reapply after updating the image.
      const currentScale = fabricImage.scaleX;
      
      fabric.Image.fromURL(dataUrl, (img) => {
        fabricImage.setElement(img.getElement());
        // Update to the original image dimensions and reapply the scale.
        fabricImage.set({
          width: origWidth,
          height: origHeight,
          scaleX: currentScale,
          scaleY: currentScale,
        });
        this.canvas.renderAll();
      });
    } catch (error) {
      console.error('Error applying grayscale effect:', error);
    }
  }
  

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeCanvas);

    const toolbar = document.querySelector('.floating-toolbar') as HTMLElement;
    if (toolbar) {
      toolbar.removeEventListener('mousedown', (e) => this.dragStart(e));
      toolbar.removeEventListener('mousemove', (e) => this.drag(e));
      toolbar.removeEventListener('mouseup', () => this.dragEnd());
      toolbar.removeEventListener('mouseleave', () => this.dragEnd());
    }
  }
}