import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

interface IRow {
  make: string;
  model: string;
  price: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {}

  @ViewChild(AgGridAngular) agGrid: AgGridAngular;

  ngOnInit(): void {
   this.rowData = this.http.get<any>('https://www.ag-grid.com/example-assets/row-data.json')
  }
  title = 'AG_Grid';

  themeClass =
    "ag-theme-quartz";

  rowData : Observable<any>;

  colDefs: ColDef<IRow>[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" }
  ];

  defaultColDef: ColDef = {
     sortable: true, filter: true 
  }

  onCellClicked(event: any) {
    console.log(event.value); 
  }

  clearSelection() {
    this.agGrid.api.deselectAll();
  }

}
