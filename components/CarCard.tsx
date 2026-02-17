
import React from 'react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  onBook: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onBook }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-blue-600 shadow-sm">
          {car.category}
        </div>
        <div className="absolute top-4 right-4 bg-yellow-400 text-slate-900 px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
          ★ {car.rating}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{car.name}</h3>
            <p className="text-slate-500 text-sm">{car.brand}</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-blue-600">${car.pricePerDay}</span>
            <span className="text-slate-400 text-xs block">/day</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            {car.seats} Seats
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            {car.fuelType}
          </div>
        </div>

        <button 
          onClick={() => onBook(car)}
          className="w-full bg-slate-900 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-colors duration-300"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};
