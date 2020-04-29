import { 
  Component, 
  OnInit, 
  OnDestroy, 
  ChangeDetectionStrategy, 
  ChangeDetectorRef, Output, 
  EventEmitter } from '@angular/core';
import { GetGoodsService } from 'src/app/services/get-goods.service';
import { Subscription, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { GoodsItem } from 'src/app/domain/interfaces/good.interface';
import { FormControl } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-goods-table-container',
  templateUrl: './goods-table-container.component.html',
  styleUrls: ['./goods-table-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoodsTableContainerComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public isError$ = of(false);
  public isLoading$ = of(true);
  public goodsList: GoodsItem[];
  public options: string[];
  public select = new FormControl('');
  public selectName = 'Категория';
  public errorMessage = 'Не удалось загрузить данные товаров. Попробуйте позже.';
  public filter = '';

  constructor(private goodsService: GetGoodsService,
              private cartService: CartService,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.isError$ = this.goodsService.isError$;
    this.subscription = this.goodsService.getGoods().pipe(
      map(data => {
        this.goodsList = this.mapDataToGoodsList(data);
        this.options = this.mapOptionsForSelect(data);
        this.isLoading$ = of(false);
        this.cdRef.detectChanges();
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  mapDataToGoodsList(goodsArray): GoodsItem[] {
    return goodsArray.filter(goodSet => goodSet.group).map(goodSet =>
      goodSet.skus.map(good =>
        ({
          ...good,
          group: goodSet.group.name.toUpperCase()
        })
      )
    ).flat();
  }

  mapOptionsForSelect(goodsArray): string[] {
    return goodsArray.reduce((acc, next) => {
      if (next.group) {
        return [...acc, next.group.name.toUpperCase()];
      }
      return acc;
    }, ['']);
  }

  setFiltration() {
    this.filter = this.select.value;
  }

  addToCart() {
    if (this.goodsList) {
      this.cartService.selectedGoods$.pipe(
        take(1),
        map(selectedItems => {
          this.goodsList = this.goodsList.filter(good => selectedItems.indexOf(good) === -1);
        })
      ).subscribe();
    }
  }

  addToSelection(item: GoodsItem) {
    this.cartService.addToSelection(item);
  }

  removeFromSelection(item: GoodsItem) {
    this.cartService.removeFromSelection(item);
  }
}
