
export enum CarCategory {
  SEDAN = 'Sedan',
  SUV = 'SUV',
  LUXURY = 'Luxury',
  ELECTRIC = 'Electric',
  SPORTS = 'Sports'
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  category: CarCategory;
  pricePerDay: number;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Gasoline' | 'Electric' | 'Hybrid';
  image: string;
  rating: number;
  description: string;
  features: string[];
}

export interface SearchFilters {
  category?: CarCategory;
  minPrice?: number;
  maxPrice?: number;
  seats?: number;
}

export interface Booking {
  carId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
}
