
import { Car, CarCategory } from './types';

export const MOCK_CARS: Car[] = [
  {
    id: '1',
    name: 'Model S Plaid',
    brand: 'Tesla',
    category: CarCategory.ELECTRIC,
    pricePerDay: 189,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Electric',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad42243c59?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    description: 'The ultimate electric performance sedan.',
    features: ['Autopilot', 'Ludicrous Mode', 'Premium Audio']
  },
  {
    id: '2',
    name: '911 Carrera',
    brand: 'Porsche',
    category: CarCategory.SPORTS,
    pricePerDay: 299,
    seats: 2,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    description: 'Timeless design and legendary performance.',
    features: ['Sport Exhaust', 'Launch Control', 'Bose Sound']
  },
  {
    id: '3',
    name: 'Range Rover HSE',
    brand: 'Land Rover',
    category: CarCategory.SUV,
    pricePerDay: 210,
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    description: 'Luxury off-roading at its finest.',
    features: ['All-Wheel Drive', 'Panoramic Roof', 'Massaging Seats']
  },
  {
    id: '4',
    name: 'M4 Competition',
    brand: 'BMW',
    category: CarCategory.SPORTS,
    pricePerDay: 175,
    seats: 4,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    description: 'Precision engineering for the driving enthusiast.',
    features: ['Carbon Fiber Trim', 'M-Performance', 'Heads-up Display']
  },
  {
    id: '5',
    name: 'E-Tron GT',
    brand: 'Audi',
    category: CarCategory.ELECTRIC,
    pricePerDay: 195,
    seats: 4,
    transmission: 'Automatic',
    fuelType: 'Electric',
    image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    description: 'Progressive luxury with soul-stirring performance.',
    features: ['Matrix LED', 'Virtual Cockpit', 'B&O 3D Sound']
  },
  {
    id: '6',
    name: 'S-Class',
    brand: 'Mercedes-Benz',
    category: CarCategory.LUXURY,
    pricePerDay: 250,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    description: 'The standard of luxury in automotive engineering.',
    features: ['Rear Seat Luxury', 'Airmatic Suspension', 'Quiet Cabin']
  }
];
