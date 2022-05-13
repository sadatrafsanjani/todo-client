import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ItemResponse} from "../dto/item-response";
import {ItemRequest} from "../dto/item-request";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private url = environment.url + '/items';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<ItemResponse[]> {

    return this.http.get<ItemResponse[]>(this.url);
  }

  save(payload: ItemRequest) {

    return this.http.post<ItemResponse>(this.url, payload);
  }

  update(id: number, payload: ItemRequest) {

    return this.http.put<ItemResponse>(this.url + '/' + id, payload);
  }
}
