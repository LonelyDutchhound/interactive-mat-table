import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GoodsItem } from 'src/app/domain/interfaces/good.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private selectedGoods = new BehaviorSubject<GoodsItem[]>([]);
  public selectedGoods$ = this.selectedGoods.asObservable();

  constructor() { }

  addToSelection(item: GoodsItem) {
    const selectedItems = [...this.selectedGoods.value, item];
    this.selectedGoods.next(selectedItems);
  }

  removeFromSelection(item: GoodsItem) {
    const selectedItems = [...this.selectedGoods.value.slice(0, this.selectedGoods.value.indexOf(item)),
                            ...this.selectedGoods.value.slice(this.selectedGoods.value.indexOf(item) + 1)];
    this.selectedGoods.next(selectedItems);
  }
}
