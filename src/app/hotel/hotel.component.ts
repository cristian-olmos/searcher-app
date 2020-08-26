import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HotelsService} from '../core/services/hotels.service';
import {Hotel} from '../core/models/hotel';
import {Location} from '@angular/common';
import {Room} from '../core/models/room';
import {Service} from '../core/models/service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  hotel: Hotel;
  rooms: Room[];
  services: Service[];

  constructor(private route: ActivatedRoute,
              private hotelsService: HotelsService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.getHotel();
  }

  getHotel(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.hotelsService.getHotel(id)
      .subscribe(hotel => this.hotel = hotel.data);
    this.hotelsService.getRooms(id)
      .subscribe(rooms => this.rooms = rooms.data);
    this.hotelsService.getServices(id)
      .subscribe(services => this.services = services.data);
  }

}
