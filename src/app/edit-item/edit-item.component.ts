import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ItemRequest} from "../dto/item-request";
import {ItemService} from "../service/item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {ItemResponse} from "../dto/item-response";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  id: number = 0;
  itemForm!: FormGroup;
  response !: ItemResponse;
  itemRequest!: ItemRequest;

  constructor(private itemService: ItemService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
    this.itemRequest = {
      itemName: '',
      description: '',
      date: new Date(),
      status: false
    }

    this.activatedRoute.params.subscribe(params => {
      this.id = params[`id`];
    });
  }

  ngOnInit(): void {

    this.itemForm = new FormGroup({
      item: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    });

    this.getItemById();
  }


  private getItemById(){

    this.itemService.getItemById(this.id).subscribe(response => {
      this.itemForm.setValue({
        item: response.itemName,
        description: response.description,
        date: response.date,
        status: response.status
      });
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

  get status() {
    return this.itemForm.get('status');
  }

  onSubmit(){

    this.spinner.show();

    this.itemRequest.itemName = this.item?.value;
    this.itemRequest.description = this.description?.value;
    this.itemRequest.date = this.date?.value;
    this.itemRequest.status = this.status?.value;

    this.itemService.update(this.id, this.itemRequest).subscribe(response => {
      this.toastr.success('Item updated successfully!');
      this.router.navigateByUrl('/');
    })

    console.log(this.itemRequest);

    this.spinner.hide();
  }

}
