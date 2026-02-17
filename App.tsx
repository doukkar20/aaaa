
import React, { useState, useMemo } from 'react';
import { MOCK_CARS } from './constants';
import { Car, CarCategory } from './types';
import { CarCard } from './components/CarCard';
import { AiAssistant } from './components/AiAssistant';

const App: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<CarCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CarCategory | 'All'>('All');
  const [bookingCar, setBookingCar] = useState<Car | null>(null);

  const filteredCars = useMemo(() => {
    return MOCK_CARS.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           car.brand.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesActiveCategory = activeCategory === 'All' || car.category === activeCategory;
      
      const matchesAiRecommendation = selectedCategories.length === 0 || 
                                    selectedCategories.includes(car.category);

      return matchesSearch && matchesActiveCategory && matchesAiRecommendation;
    });
  }, [searchQuery, activeCategory, selectedCategories]);

  return (
    <div className="min-h-screen bg-[#fcfdff]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg rotate-3">L</div>
              <span className="text-2xl font-black text-slate-900 tracking-tight">Luxe<span className="text-blue-600">Drive</span></span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Fleet</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Locations</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Services</a>
              <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-blue-600 transition-all shadow-md">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-16 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl opacity-50 -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Find the perfect ride <br />
            <span className="gradient-text">for every journey.</span>
          </h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Luxury car rentals meet artificial intelligence. Tell our concierge your plans and let Gemini find the vehicle that fits your lifestyle.
          </p>
          
          <div className="max-w-4xl mx-auto bg-white p-2 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-2 border border-slate-100">
            <div className="flex-1 flex items-center px-6 py-4 border-r border-slate-100">
              <div className="text-blue-600 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input 
                type="text" 
                placeholder="Search by brand or model..." 
                className="w-full bg-transparent outline-none text-slate-700 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center px-6 py-4">
              <div className="text-blue-600 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <span className="text-slate-400 font-medium">San Francisco, CA</span>
            </div>
            <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              Check Availability
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar / AI Concierge */}
          <aside className="lg:w-1/3">
            <AiAssistant 
              onRecommendation={setSelectedCategories} 
              onReset={() => setSelectedCategories([])}
            />
          </aside>

          {/* Cars Grid */}
          <section className="lg:w-2/3">
            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
              <div className="flex flex-wrap gap-2">
                {['All', ...Object.values(CarCategory)].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat as any)}
                    className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                      activeCategory === cat 
                        ? 'bg-slate-900 text-white shadow-lg' 
                        : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <p className="text-slate-400 text-sm font-medium">
                Showing {filteredCars.length} results
              </p>
            </div>

            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCars.map(car => (
                  <CarCard 
                    key={car.id} 
                    car={car} 
                    onBook={(car) => setBookingCar(car)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No cars match your selection</h3>
                <p className="text-slate-500">Try adjusting your filters or ask our AI for different recommendations.</p>
                <button 
                  onClick={() => {
                    setActiveCategory('All');
                    setSelectedCategories([]);
                    setSearchQuery('');
                  }}
                  className="mt-6 text-blue-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Booking Modal */}
      {bookingCar && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="relative h-56">
              <img src={bookingCar.image} alt={bookingCar.name} className="w-full h-full object-cover" />
              <button 
                onClick={() => setBookingCar(null)}
                className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 backdrop-blur p-2 rounded-full text-white transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-3xl font-black text-slate-900">{bookingCar.name}</h2>
                  <p className="text-slate-500">{bookingCar.brand} • {bookingCar.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400 font-medium">Daily Rate</p>
                  <p className="text-3xl font-black text-blue-600">${bookingCar.pricePerDay}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-3 border-b border-slate-50">
                  <span className="text-slate-500">Pick-up Location</span>
                  <span className="font-bold text-slate-900">SF International Airport</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-50">
                  <span className="text-slate-500">Return Location</span>
                  <span className="font-bold text-slate-900">Same as pick-up</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setBookingCar(null)}
                  className="flex-1 py-4 px-6 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('Reservation confirmed! Check your email for details.');
                    setBookingCar(null);
                  }}
                  className="flex-[2] py-4 px-6 bg-blue-600 rounded-2xl font-bold text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg rotate-3">L</div>
                <span className="text-xl font-black tracking-tight text-white">Luxe<span className="text-blue-500">Drive</span></span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
                Reimagining the car rental experience through high-performance vehicles and intelligent customer service.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Explore</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Our Fleet</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Special Offers</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Business Program</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Gift Cards</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Rental Policies</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
            © 2024 LuxeDrive AI Rental. All rights reserved. Built with Gemini.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
