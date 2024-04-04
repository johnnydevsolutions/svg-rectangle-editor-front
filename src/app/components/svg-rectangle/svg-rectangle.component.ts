import { Component, OnInit } from '@angular/core';
import { Dimensions } from 'src/app/dimensions';
import { SvgService } from 'src/app/svg.service';

@Component({
  selector: 'app-svg-rectangle',
  templateUrl: './svg-rectangle.component.html',
  styleUrls: ['./svg-rectangle.component.css']
})
export class SvgRectangleComponent implements OnInit {
  rectX = 0;
  rectY = 0;
  rectWidth!: number;
  rectHeight!: number;
  dragging = false;
  resizing = false;
  perimeter = 0;

  private startX!: number;
  private startY!: number;


  constructor(private svgService: SvgService) {}


  ngOnInit() {
    this.svgService.getInitialDimensions().subscribe({
      next: (dimensions: Dimensions) => {
        this.rectWidth = dimensions.Width;
        this.rectHeight = dimensions.Height;
        this.updatePerimeter();
      },
    });
  }

  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.dragging = true;
    this.startX = event.clientX - this.rectX;
    this.startY = event.clientY - this.rectY;
  }

  onResizeHandleDown(event: MouseEvent): void {
    event.preventDefault();
    this.resizing = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
  }

  onMouseMove(event: MouseEvent): void {
    event.preventDefault();
    if (this.dragging) {
      this.rectX = event.clientX - this.startX;
      this.rectY = event.clientY - this.startY;
    } else if (this.resizing) {
      // Calculate new width and height
      const newWidth = event.clientX - this.rectX;
      const newHeight = event.clientY - this.rectY;
      if (newWidth > 0) {
        this.rectWidth = newWidth;
      }
      if (newHeight > 0) {
        this.rectHeight = newHeight;
      }
      this.updatePerimeter();
    }
  }

  onMouseUp(): void {
    if (this.dragging || this.resizing) {
      this.svgService.saveDimensions({ Width: this.rectWidth, Height: this.rectHeight }).subscribe();
    }
    this.dragging = false;
    this.resizing = false;
  }

  saveDimensions(): void {
    this.svgService.saveDimensions({ Width: this.rectWidth, Height: this.rectHeight })
      .subscribe(() => {
        console.log("Dimensions saved successfully");
      }, error => {
        console.error("Error saving dimensions", error);
      });
  }

  updatePerimeter(): void {
    this.perimeter = 2 * (this.rectWidth + this.rectHeight);
  }
  
}
