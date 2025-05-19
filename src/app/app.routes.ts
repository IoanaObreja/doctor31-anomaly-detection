import { Routes } from '@angular/router';
import { FileUploadComponent } from './features/file-upload/file-upload.component';

export const routes: Routes = [
    { path: 'home', component: FileUploadComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
