import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Location } from '@app/interfaces/location.interface';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class MapPageComponent implements OnInit {
  selectedCategory: string = 'wedding';
  selectedLocation: string = 'Wedding Ceremony Venue';
  locations: Record<string, Location[]> = {
    wedding: [
      {
        name: 'Wedding Ceremony Venue',
        description: 'The main ceremony and celebration venue',
        address: 'Tunis, Tunisia',
        image: '/assets/images/venue.jpg',
        category: 'wedding'
      },
      {
        name: "Grandmother's House",
        description: 'Traditional Henna ceremony location',
        address: 'Tunis, Tunisia',
        image: '/assets/images/henna.jpg',
        category: 'wedding'
      }
    ],
    hotels: [
      {
        name: 'Four Seasons Tunis',
        description: 'Luxury beachfront hotel',
        address: 'Zone Touristique Gammarth, 1057',
        image: '/assets/images/hotel1.jpg',
        category: 'hotels'
      }
    ],
    restaurants: [
      {
        name: 'Dar El Jeld',
        description: 'Traditional Tunisian cuisine',
        address: '5-10 Rue Dar El Jeld, Tunis',
        image: '/assets/images/restaurant1.jpg',
        category: 'restaurants'
      }
    ],
    attractions: [
      {
        name: 'Medina of Tunis',
        description: 'UNESCO World Heritage site',
        address: 'Medina, Tunis',
        image: '/assets/images/medina.jpg',
        category: 'attractions'
      }
    ]
  };

  categories = [
    { id: 'wedding', label: 'Wedding Venues' },
    { id: 'hotels', label: 'Accommodations' },
    { id: 'restaurants', label: 'Restaurants' },
    { id: 'attractions', label: 'Attractions' }
  ];

  ngOnInit() {
    // Initialize map with wedding locations
    this.initializeMap();
  }

  private initializeMap() {
    // Implementation for map initialization
    // This would integrate with a mapping service like Google Maps
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    // Update map markers based on category
  }

  onLocationSelect(location: Location) {
    this.selectedLocation = location.name;
    // Center map on selected location
    // This would update the map view to focus on the selected location
  }

  getFilteredLocations(): Location[] {
    return this.locations[this.selectedCategory] || [];
  }
}