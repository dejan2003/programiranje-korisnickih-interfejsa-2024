import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { FlightModel } from '../../model/flight.model';
import { PageModel } from '../../model/page.model';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

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
    MatSelectModule
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private client: HttpClient;
  public recommended: FlightModel[] = [];

  public destinations: string[] = [
    'Zagreb', 'Memmingen', 'Vienna'
  ]

  public airlines: string[] = [
    'Air Serbia', 'Fly Emirates', 'Lufthansa'
  ]

  public flightClass: string[] = [
    'First Class', 'Business', 'Economy'
  ]

  constructor(private httpClient: HttpClient) {
    this.client = httpClient;
  }

  ngOnInit(): void {
    const url =
      'https://flight.pequla.com/api/flight?page=0&size=3&type=departure&sort=scheduledAt,desc';
    this.client
      .get<PageModel<FlightModel>>(url, {
        headers: {
          Accept: 'application/json',
        },
      })
      .subscribe((rsp) => (this.recommended = rsp.content));
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
