import { Routes } from '@angular/router';
import { FileUploadComponent } from './features/file-upload/file-upload.component';
import { DataTableComponent } from './features/data-table/data-table.component';

export const routes: Routes = [
    { path: 'home', component: FileUploadComponent },
    { path: 'table', component: DataTableComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
