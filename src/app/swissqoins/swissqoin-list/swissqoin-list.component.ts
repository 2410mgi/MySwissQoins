import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { onSnapshot } from 'firebase/firestore';
import { Swissqoin } from 'src/app/model/swissqoin';
import { SwissqoinsService } from 'src/app/services/swissqoins.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';


@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.

  firstPageLabel = $localize`Première page`;
  itemsPerPageLabel = $localize`Items par page `;
  lastPageLabel = $localize`Dernière`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Page suivante';
  previousPageLabel = 'Page précédente';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Page 1 sur 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Page ${page + 1} sur ${amountPages}`;
  }
}

@Component({
  selector: 'app-swissqoin-list',
  templateUrl: './swissqoin-list.component.html',
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
  styleUrls: ['./swissqoin-list.component.css']
})
export class SwissqoinListComponent implements OnInit {

  swissqoins = new Array<Swissqoin>();
  dataSource!: MatTableDataSource<Swissqoin>;
  resultsLength = 0;

  @ViewChild(MatTable) table!: MatTable<Swissqoin>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['date', 'swissqoins', 'montant', 'rendement', 'benefice', 'action'];

  constructor(private swissqoinService: SwissqoinsService,) { }

  ngOnInit(): void {

    this.paginator?.page;

    onSnapshot(this.swissqoinService.getAll(), (doc) => {
      console.log(doc.docChanges().forEach(element => {
        let sq: Swissqoin = element.doc.data() as Swissqoin;
        this.swissqoins.push(sq);
      }));
      this.dataSource = new MatTableDataSource(this.swissqoins);
      this.dataSource.paginator = this.paginator;
    });
  }
}
