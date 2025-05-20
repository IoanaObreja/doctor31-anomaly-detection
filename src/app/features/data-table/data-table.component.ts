import { Component, ViewChild } from '@angular/core';
import * as Papa from 'papaparse';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-data-table',
  imports: [MatTableModule, MatSortModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {
  file: File | null = null;
  displayedColumns: string[] = ['id_cases', 'age_v', 'sex_v', 'agreement', 'greutate', 'inaltime', 'IMC', 'data1', 'finalizat', 'testing', 'imcINdex'];
  dataSource: MatTableDataSource<string> = new MatTableDataSource<string>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['file']) {
      this.file = navigation.extras.state['file'];
      this.parseFile();
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort; 
  }

  parseFile() {
    if (this.file) {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            this.dataSource.data = result.data as string[];
          },
        });
      };
      reader.readAsText(this.file);
    }
  }
}
