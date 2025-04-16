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
  selectedLocation: string = 'Salle Mawazine';
  currentCity: 'Tunis' | 'Hammamet' = 'Tunis';

  allLocations: Record<string, Record<string, Location[]>> = {
    Tunis: {
      wedding: [
        {
          name: "Espace Nahawand",
          description: 'Wedding dinner and Henna ceremony',
          address: '2 rue 13 Aout , chotrana 2 La soukra, 2036, Tunisia',
          image: '/assets/map/espace-nahawand.jpg',
          category: 'wedding',
          coordinates: [10.201597, 36.874621]
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
        }
      ],
      airbnbs: [
        {
          name: 'Terrasse sur les toits',
          description: '1 chambre, 2 lits',
          address: 'https://fr.airbnb.ca/rooms/54101134?viralityEntryPoint=1&s=76',
          image: '/assets/map/rbnb1.png',
          category: 'airbnbs',
          coordinates: [10.330463, 36.853806]
        }
        // ...other Tunis airbnbs
      ],
      restaurants: [
        {
          name: 'Dar El Jeld',
          description: 'Traditional Tunisian cuisine',
          address: '5-10 Rue Dar El Jeld, Tunis',
          image: '/assets/map/dar-el-jeld.jpg',
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
          coordinates: [10.166735, 36.798092]
        }
      ]
    },
    Hammamet: {
      wedding: [
        {
          name: 'Salle Mawazine',
          description: 'The main ceremony and celebration venue',
          address: '9HW6+XF6, Hammamet Sud, Tunisia',
          image: '/assets/map/mawazine.jpg',
          category: 'wedding',
          coordinates: [10.614119, 36.396192]
        }
      ],
      hotels: [
        {
          name: 'One Resort Premium',
          description: 'Luxury beachfront hotel',
          address: "Bd de l'environnement, Route Touristique, Hammamet 8050, Tunisie",
          image: '/assets/map/one-resort.jpg',
          category: 'hotels',
          coordinates: [9.015375, 33.439644]
        },
        {
          name: 'La Badira',
          description: 'Luxury adult only hotel',
          address: 'Route Touristique Nord BP437 Hammamet, Mrezga 8050, Tunisie',
          image: '/assets/map/la-badira.jpg',
          category: 'hotels',
          coordinates: [10.564577, 36.421741]
        },
        {
          name: 'Radisson Blu',
          description: 'Luxury beachfront hotel',
          address: 'Avenue Hedi Nouira, Hammamet 8050, Tunisie',
          image: '/assets/map/four-seasons.jpg',
          category: 'hotels',
          coordinates: [10.642719, 36.406024]
        }
      ],
      airbnbs: [],
      restaurants: [],
      attractions: [
        {
          name: 'Hammamet Beach',
          description: 'Fabulous beach in the south of "old Hammamet"',
          address: '9JV9+C8P, Blvd. Ibn el Fourat, Hammamet, Tunisia',
          image: '/assets/map/hammamet-beach.jpg',
          category: 'attractions',
          coordinates: [10.623643, 36.397510]
        }
      ]
    }
  };

  categories = [
    { id: 'wedding', label: 'Wedding Venues' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'airbnbs', label: 'Airbnbs' },
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
        center: fromLonLat([10.614119, 36.396192]),
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

  toggleCity() {
    this.currentCity = this.currentCity === 'Tunis' ? 'Hammamet' : 'Tunis';
    const availableCategories = Object.keys(this.allLocations[this.currentCity]);
    this.selectedCategory = availableCategories.includes(this.selectedCategory) ? this.selectedCategory : availableCategories[0];
    const defaultLocation = this.getFilteredLocations()[0];
    if (defaultLocation) {
      this.onLocationSelect(defaultLocation);
    }
    this.updateMapMarkers();
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    const defaultLocation = this.getFilteredLocations()[0];
    if (defaultLocation) {
      this.onLocationSelect(defaultLocation);
    }
    this.updateMapMarkers();
  }

  onLocationSelect(location: Location) {
    this.selectedLocation = location.name;
    navigator.clipboard.writeText(location.address);
    if (location.coordinates) {
      this.map.getView().animate({
        center: fromLonLat(location.coordinates),
        zoom: 15,
        duration: 1000
      });
    }
  }

  getFilteredLocations(): Location[] {
    return this.allLocations[this.currentCity][this.selectedCategory] || [];
  }
}
