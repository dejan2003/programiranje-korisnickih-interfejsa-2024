import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { FlightModel } from '../../model/flight.model';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { WebService } from '../../services/web.service';
import { DataService } from '../../services/data.service';
import { SearchContainerComponent } from "../search-container/search-container.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    NgIf,
    NgFor,
    RouterLink,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    SearchContainerComponent
],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

  private webService: WebService
  private dataService: DataService
  public recommended: FlightModel[] = [];
  public destinations: string[] = []
  public airlines: string[] = []
  public flightClass: string[] = []

  constructor() {
    this.webService = new WebService()
    this.dataService = new DataService()
  }

  ngOnInit(): void {
    this.webService.getRecommendedFlights().subscribe((rsp) => (this.recommended = rsp.content));
    this.webService.getAvailavleDestinations().subscribe(rsp => this.destinations = rsp)
    this.airlines = this.dataService.getAirlines()
    this.flightClass = this.dataService.getFlightClass()
  }

  public generateImageUrl(dest: string) {
    return `https://img.pequla.com/destination/${dest
      .split(' ')[0]
      .toLowerCase()}.jpg`;
  }

  public formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS')
  }
}
