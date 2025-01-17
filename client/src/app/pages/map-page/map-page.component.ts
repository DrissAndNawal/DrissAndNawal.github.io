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
        address: '1057 La Marsa, Gammarth 1057, Tunisia',
        image: '/assets/map/four-seasons.jpg',
        category: 'hotels',
        coordinates: [10.288643, 36.909057]
      },
      {
        name: 'Movenpick Gammarth',
        description: 'Luxury beachfront hotel',
        address: 'B P 36, Av. Taieb Mhiri, La Marsa 2078, Tunisia',
        image: '/assets/map/movenpick.jpg',
        category: 'hotels',
        coordinates: [10.3189597, 36.8980332]
      },
      {
        name: 'Ambassadeurs',
        description: 'Downtown three-star hotel',
        address: '75 Av. Taieb M\'Hiri, Tunis 1002, Tunisia',
        image: '/assets/map/ambassadeurs.jpg',
        category: 'hotels',
        coordinates: [10.176756, 36.817326]
      }
    ],
    restaurants: [
      {
        name: 'Dar El Jeld',
        description: 'Traditional Tunisian cuisine',
        address: '5-10 Rue Dar El Jeld, Tunis',
        image: '/assets/map/dar-el-jeld.jpg',
        category: 'restaurants',
        coordinates: [10.1711, 36.7988]
      },
      {
        name: 'El Ali',
        description: 'Delicious Seafood cuisine',
        address: 'Rue Jamaa Ez Zitouna, Tunis',
        image: '/assets/map/el-ali.jpg',
        category: 'restaurants',
        coordinates: [10.16579, 36.81897]
      }
    ],
    attractions: [
      {
        name: 'Medina of Tunis',
        description: 'UNESCO World Heritage site',
        address: 'Medina, Tunis',
        image: '/assets/map/medina.jpg',
        category: 'attractions',
        coordinates: [10.166735, 36.798092]
      },
      {
        name: 'Ruins of Ancient Carthage',
        description: 'Archaeological Site of Carthage',
        address: 'Carthage, Gouvernorat de Tunis, Tunisias',
        image: '/assets/map/ancient-carthage.jpg',
        category: 'attractions',
        coordinates: [10.33161, 36.86108]
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

    // const tileLayer = new TileLayer({
    //   source: new OSM({
    //     url: 'https://api.maptiler.com/maps/basic-v2/?key=DpdaAPg0DvqmEBO40rXr#0.8/7.06080/-8.31707',
    //     crossOrigin: 'anonymous',
    //   }),
    // });

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