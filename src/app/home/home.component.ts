import { Component, OnInit } from '@angular/core';
import {ItemResponse} from "../dto/item-response";
import {ItemService} from "../service/item.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: ItemResponse[] = [];
  page: number = 1;
  collection: any[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getAllItems();
  }

  private getAllItems(){
    this.itemService.getAllItems().subscribe(response => {
      this.items = response;
      this.collection = response;
    });
  }

  getItemStatusStyle(status: boolean){

    return status ? 'text-success' : 'text-danger';
  }
}
