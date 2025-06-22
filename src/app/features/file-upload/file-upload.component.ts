import { Component, computed, effect, input, output, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadService } from './services/file-upload.service';
import { FileDropZoneDirective } from './directives/file-drop-zone.directive';
import { Router } from '@angular/router';

@Component({
  imports: [FileDropZoneDirective, MatButtonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  fileTypes = input<string[]>(['.csv', '.xlsx']);
  fileUploaded = output<boolean>();

  form = viewChild('form');
  file = computed(() => this.fileUploadService.getFile());

  fileName = signal<string | null>(null);
  fileSize = signal<number | null>(null);
  fileSizeUnit = signal<string | null>(null);

  constructor(private fileUploadService: FileUploadService, private router: Router) {
    effect(() => {
      this.fileUploaded.emit(this.file() !== null);
    });
  }

  onFileDropped(file: File) {
    this.fileUploadService.clearError();
    this.fileUploadService.setFile(file);
    this.setFileInfo();
  }

  onFileSelected(event: Event) {
    this.fileUploadService.clearError();
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileUploadService.setFile(file);
      this.setFileInfo();
    }
  }

  setFileInfo() {
    if (this.file()) {
      this.fileName.set(this.file()!.name);
      this.fileSize.set(this.fileUploadService.computeFileSize(this.file()!.size));
      this.fileSizeUnit.set(this.fileUploadService.sizeUnit());
    }
  }

  onDeleteFile() {
    this.fileUploadService.deleteFile();
    this.fileName.set(null);
    this.fileSize.set(null);
    this.fileSizeUnit.set(null);
  }

  onContinue() {
    this.router.navigate(['/table'], { state: { file: this.file()} });
  }
}
