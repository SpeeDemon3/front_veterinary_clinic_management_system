import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageUploader } from '../interfaces/image-uploader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.css'
})
export class ImageUploaderComponent {

  @Input() image: ImageUploader = { file: null, dataUrlImg: null };
  @Output() imageChange = new EventEmitter<ImageUploader>();

  onSelectImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.image = {
          file: file,
          dataUrlImg: e.target.result
        };
        this.imageChange.emit(this.image);
      };
      reader.readAsDataURL(file);
    }
  }

}
