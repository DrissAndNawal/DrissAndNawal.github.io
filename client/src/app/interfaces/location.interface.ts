export interface Location {
  name: string;
  description: string;
  address: string;
  image: string;
  category: string;
  coordinates: [number, number]; // [longitude, latitude]
}