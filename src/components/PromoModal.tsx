'use client';

import React from 'react';
import OptimizedImage from './ui/OptimizedImage';

interface PromoModalProps {
  onClose: () => void;
}

// Sample upcoming events data
const upcomingEvents = [
  {
    id: 2,
    title: "",
    date: "22 JULY 2025",
    time: "Tuesdays, Wednesdays & Saturdays",
    location: "Ashongman Estates, Accra, Ghana",
    image: "/images/events/summer-camp.jpg",
    description: `ACTIVITIES:\n• Coding & Game Design\n• Robotics & AI\n• Circuits & Electronics\n• Digital Arts\n• 3D Model/Print\n• Micro:bits`,
    registrationLink: "https://bit.ly/gccsummerschool"
  }
];

export default function PromoModal({ onClose }: PromoModalProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/70">
      <div className="relative bg-white rounded-lg w-full max-w-[90%] sm:max-w-[80%] md:max-w-[800px] shadow-2xl overflow-y-auto h-[80vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-red-500 [&::-webkit-scrollbar-thumb]:rounded-full [scrollbar-width:thin] [scrollbar-color:rgb(239,68,68)_rgb(243,244,246)]">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors z-50 p-2 hover:bg-gray-100 rounded-full bg-white shadow-sm"
        >
          <svg className="w-6 h-6 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal content */}
        <div className="p-6 sm:p-8 pt-14">
          <style jsx>{`
            @keyframes pulseAndBounce {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
            .animate-temporary {
              animation: pulseAndBounce 1s ease-in-out 3;
            }
          `}</style>
          <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white text-center py-2 px-4 rounded-full text-sm font-semibold mb-3 transform hover:scale-105 transition-transform duration-300 shadow-lg animate-temporary">
            <span className="inline-block">🔔</span> Upcoming Event
          </div>
          
          <h2 className="text-xl sm:text-2xl text-gray-900 mb-6 text-center font-['Delius']">
          Join Our Exciting  Summer Activities           
          </h2>

          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-[192px_1fr] gap-6">
                  <div className="w-full aspect-square md:aspect-auto overflow-hidden rounded-lg">
                    <OptimizedImage
                      src={event.image}
                      alt={event.title}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover rounded-lg"
                      priority={true}
                      quality={75}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-gray-900 mb-2 font-['Delius']">{event.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="flex-1">{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="flex-1">{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="flex-1">{event.location}</span>
                      </div>
                    </div>
                    <div className="mt-3 text-gray-600">
                      {event.description.split('\n').map((line, idx) => (
                        <span key={idx} className={idx === 0 ? "font-semibold text-red-500" : undefined}>
                          {line}<br />
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <a 
                        href={event.registrationLink}
                        className="bg-red-500 text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors text-center w-full sm:w-auto shadow-sm hover:shadow-md"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Register Your Kids
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 