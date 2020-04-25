import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


const GET_URL = 'https://ssdev.superagent.ru/TestApp/Values/GetWithParent';
const CONFIG = {responseType: 'json' as const};

@Injectable({
  providedIn: 'root'
})
export class GetGoodsService {
  public isError = new BehaviorSubject(false);
  public isError$ = this.isError.asObservable();

  constructor(private http: HttpClient) { }

  getGoods(): Observable<any> {
    return this.http.get(GET_URL, CONFIG);
  }
}
