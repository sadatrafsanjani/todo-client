import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ItemRequest} from "../dto/item-request";
import {ItemService} from "../service/item.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  itemForm!: FormGroup;
  itemRequest!: ItemRequest;

  constructor(private itemService: ItemService,
              private router: Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
    this.itemRequest = {
      itemName: '',
      description: '',
      date: new Date()
    }
  }

  ngOnInit(): void {

    this.itemForm = new FormGroup({
      item: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required])
    });
  }

  get item() {
    return this.itemForm.get('item');
  }

  get description() {
    return this.itemForm.get('description');
  }

  get date() {
    return this.itemForm.get('date');
  }

  onSubmit(){

    this.spinner.show();

    this.itemRequest.itemName = this.item?.value;
    this.itemRequest.description = this.description?.value;
    this.itemRequest.date = this.date?.value;

    this.itemService.save(this.itemRequest).subscribe(response => {
      this.toastr.success('Item saved successfully!');
    })

    this.spinner.hide();
  }

}
