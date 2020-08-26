import {Component, OnInit} from '@angular/core';
import {HotelsService} from '../core/services/hotels.service';
import {Hotel} from '../core/models/hotel';
import {ServicesService} from '../core/services/servicess.service';
import {Service} from '../core/models/service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  hotels: Hotel[] = [];
  services: Service[];
  selectedServices: string[] = [];
  selectedCategories: number[] = [];
  hotelName: string;

  constructor(private hotelsService: HotelsService, private servicesService: ServicesService) {
  }

  ngOnInit(): void {
    this.servicesService.getServices()
      .subscribe(services => this.services = services.data);
  }

  search(): void {
    console.log(this.selectedServices);
    console.log(this.selectedCategories);
    console.log(this.hotelName);
    this.hotelsService.search(this.hotelName, this.selectedCategories, this.selectedServices)
      .subscribe(hotels => this.hotels = hotels.data);
  }

  onChange(id: string, isChecked: boolean): void {
    if (isChecked) {
      this.selectedServices.push(id);
    } else {
      const index: number = this.selectedServices.indexOf(id);
      if (index !== -1) {
        this.selectedServices.splice(index, 1);
      }
    }
  }

  onChangeCategories(id: number, isChecked: boolean): void {
    if (isChecked) {
      this.selectedCategories.push(id);
    } else {
      const index: number = this.selectedCategories.indexOf(id);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
  }

}
