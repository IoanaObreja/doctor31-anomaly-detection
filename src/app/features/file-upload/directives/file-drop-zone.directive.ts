import { Directive, Host, HostListener, input, output } from '@angular/core';

@Directive({
  selector: '[appFileDropZone]'
})
export class FileDropZoneDirective {
  types = input<string[]>(['.csv', '.xlsx']);

  fileDropped = output<File>();

  validTypes = ['.csv', '.xlsx'];

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {  
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      if(files.length > 1) {
        console.error('You can only upload one file. Please upload only one file.');
      }
      const file = files[0];
      if (this.validateFileType(file)) {
        this.fileDropped.emit(file);
      } else {
        console.error('Invalid file type');
      }
    }
  }

  constructor() { }

  validateFileType(file: File) {
    const fileType = file.name.split('.').pop();
    return this.validTypes.includes(`.${fileType}`);
  }
}
