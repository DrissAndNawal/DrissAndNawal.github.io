import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Location } from '@app/interfaces/location.interface';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon } from 'ol/style';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
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
export class MapPageComponent implements OnInit, OnDestroy {
  private map!: Map;
  private vectorSource!: VectorSource;
  private vectorLayer!: VectorLayer<VectorSource>;
  selectedCategory: string = 'wedding';
  selectedLocation: string = 'Wedding Ceremony Venue';
  
  // Add coordinates to your locations
  locations: Record<string, Location[]> = {
    wedding: [
      {
        name: 'Wedding Ceremony Venue',
        description: 'The main ceremony and celebration venue',
        address: 'Tunis, Tunisia',
        image: '/assets/map/venue.jpg',
        category: 'wedding',
        coordinates: [10.1815, 36.8065]
      },
      {
        name: "Grandmother's House",
        description: 'Traditional Henna ceremony location',
        address: 'Tunis, Tunisia',
        image: '/assets/map/henna.jpg',
        category: 'wedding',
        coordinates: [10.1815, 36.8065]
      }
    ],
    hotels: [
      {
        name: 'Four Seasons Tunis',
        description: 'Luxury beachfront hotel',
        address: 'Zone Touristique Gammarth, 1057',
        image: '/assets/map/hotel1.jpg',
        category: 'hotels',
        coordinates: [10.2897, 36.9231]
      }
    ],
    restaurants: [
      {
        name: 'Dar El Jeld',
        description: 'Traditional Tunisian cuisine',
        address: '5-10 Rue Dar El Jeld, Tunis',
        image: '/assets/map/restaurant1.jpg',
        category: 'restaurants',
        coordinates: [10.1711, 36.7988]
      }
    ],
    attractions: [
      {
        name: 'Medina of Tunis',
        description: 'UNESCO World Heritage site',
        address: 'Medina, Tunis',
        image: '/assets/map/medina.jpg',
        category: 'attractions',
        coordinates: [10.1700, 36.7988]
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
    this.initializeMap();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.setTarget(undefined);
    }
  }

  private initializeMap() {
    this.vectorSource = new VectorSource();
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.vectorLayer
      ],
      view: new View({
        center: fromLonLat([10.1815, 36.8065]),
        zoom: 13
      })
    });

    this.updateMapMarkers();
  }

  private updateMapMarkers() {
    this.vectorSource.clear();

    const locations = this.getFilteredLocations();
    locations.forEach(location => {
      if (location.coordinates) {
        const marker = new Feature({
          geometry: new Point(fromLonLat(location.coordinates))
        });

        marker.setStyle(new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: '../../../assets/map/marker.png',
            scale: 0.06
          })
        }));

        this.vectorSource.addFeature(marker);
      }
    });
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.updateMapMarkers();
  }

  onLocationSelect(location: Location) {
    this.selectedLocation = location.name;
    navigator.clipboard.writeText(location.address)
    if (location.coordinates) {
      this.map.getView().animate({
        center: fromLonLat(location.coordinates),
        zoom: 15,
        duration: 1000
      });
    }
  }

  getFilteredLocations(): Location[] {
    return this.locations[this.selectedCategory] || [];
  }
}