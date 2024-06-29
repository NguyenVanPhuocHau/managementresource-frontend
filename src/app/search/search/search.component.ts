import { Component } from '@angular/core';
import { CustomerService } from '../../service/customerService';
import { error } from 'jquery';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  customerId: number;
  constructor(private customerService: CustomerService){}
  customerData: any;
  findCustomerInfor(){
    this.customerService.getCustomerById(this.customerId).subscribe(
      res => {this.customerData = res}, error => console.log(error)
    )
  }

}
