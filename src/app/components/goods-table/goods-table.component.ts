import {
  Component, 
  OnInit, 
  ViewChild, 
  Input, 
  Output,
  ChangeDetectionStrategy, 
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { GoodsItem } from 'src/app/domain/interfaces/good.interface';
import { CURRENCY } from 'src/app/domain/constants/constants';
import { TableColumnNames } from 'src/app/domain/enums/table-column-names';

@Component({
  selector: 'app-goods-table',
  templateUrl: './goods-table.component.html',
  styleUrls: ['./goods-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoodsTableComponent implements OnInit {
  // tslint:disable-next-line
  private _goodsList: GoodsItem[];
  // tslint:disable-next-line
  private _filterValue = '';
  public displayedColumns: string[] = [
    TableColumnNames.CHECKBOX,
    TableColumnNames.GROUP,
    TableColumnNames.NAME,
    TableColumnNames.PRICE
  ];
  public currency = CURRENCY;
  public dataSource: MatTableDataSource<GoodsItem>;

  @Input()
  set goodsList(list) {
    // tslint:disable-next-line
    this._goodsList = list;
    this.dataSource = new MatTableDataSource(list);
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.filterByGroup;
    if (this.filter) {
      this.dataSource.filter = this.filter;
    }
  }
  get goodsList() {
    // tslint:disable-next-line
    return this._goodsList;
  }

  @Input()
  set filter(filterValue) {
    this.dataSource.filter = filterValue;
    this._filterValue = filterValue;
  }
  get filter() {
    return this._filterValue;
  }

  @Output() onAddToSelection: EventEmitter<GoodsItem> = new EventEmitter<GoodsItem>();
  @Output() onRemoveFromSelection: EventEmitter<GoodsItem> = new EventEmitter<GoodsItem>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  filterByGroup(data: GoodsItem, filter: string) {
    return data.group.toLowerCase().includes(filter.toLowerCase());
  }

  toggleSelectionOne($event) {
    const selectedItem = this.goodsList.filter(good => good.id === $event.source.id)[0];
    $event.checked ? this.onAddToSelection.emit(selectedItem) : this.onRemoveFromSelection.emit(selectedItem);
  }

}
