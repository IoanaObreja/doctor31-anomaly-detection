import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private readonly BYTES_IN_MB = 1_000_000;
  private readonly BYTES_IN_GB = 1_000_000_000;
  private readonly PRECISION_SCALE = 100;

  file = signal<File | null>(null);
  errorMessage = signal<string | null>(null);
  sizeUnit = signal<string | null>(null);

  constructor() { }

  getFile() {
    return this.file();
  }

  deleteFile() {
    this.file.set(null);
  }

  setFile(file: File) {
    this.file.set(file);
  }

  getError() {
    return this.errorMessage();
  }

  setError(message: string) {
    this.errorMessage.set(message);
  }

  clearError() {
    this.errorMessage.set(null);
  }

  computeFileSize(fileSizeInBytes: number) {
    const fileSizeInGb = fileSizeInBytes / this.BYTES_IN_GB;
    if (fileSizeInGb >= 1) {
        this.sizeUnit.set('GB');
        return Math.round(fileSizeInGb * this.PRECISION_SCALE) / this.PRECISION_SCALE;
    }

    const fileSizeInMb = fileSizeInBytes / this.BYTES_IN_MB;
    if (fileSizeInMb >= 1) {
        this.sizeUnit.set('MB');
        return Math.round(fileSizeInMb * this.PRECISION_SCALE) / this.PRECISION_SCALE;
    }

    const fileSizeInKb = fileSizeInBytes / 1_000; // 1 KB = 1,000 bytes
    this.sizeUnit.set('KB');
    return Math.round(fileSizeInKb * this.PRECISION_SCALE) / this.PRECISION_SCALE;
}
}


