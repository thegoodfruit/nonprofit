'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Sample data points representing Christian activity around the world
const activityPoints = [
  { lat: 40.7128, lng: -74.0060, city: 'New York', members: 45000, prayers: 125000 },
  { lat: 34.0522, lng: -118.2437, city: 'Los Angeles', members: 38000, prayers: 98000 },
  { lat: 51.5074, lng: -0.1278, city: 'London', members: 28000, prayers: 76000 },
  { lat: 6.5244, lng: 3.3792, city: 'Lagos', members: 52000, prayers: 180000 },
  { lat: -23.5505, lng: -46.6333, city: 'Sao Paulo', members: 42000, prayers: 145000 },
  { lat: 14.5995, lng: 120.9842, city: 'Manila', members: 35000, prayers: 120000 },
  { lat: 37.5665, lng: 126.9780, city: 'Seoul', members: 48000, prayers: 165000 },
  { lat: -1.2921, lng: 36.8219, city: 'Nairobi', members: 22000, prayers: 85000 },
  { lat: 19.4326, lng: -99.1332, city: 'Mexico City', members: 31000, prayers: 92000 },
  { lat: 28.6139, lng: 77.2090, city: 'New Delhi', members: 18000, prayers: 65000 },
  { lat: -33.8688, lng: 151.2093, city: 'Sydney', members: 15000, prayers: 48000 },
  { lat: 55.7558, lng: 37.6173, city: 'Moscow', members: 12000, prayers: 38000 },
  { lat: 35.6762, lng: 139.6503, city: 'Tokyo', members: 8000, prayers: 28000 },
  { lat: 1.3521, lng: 103.8198, city: 'Singapore', members: 14000, prayers: 52000 },
  { lat: -26.2041, lng: 28.0473, city: 'Johannesburg', members: 25000, prayers: 78000 }
]

function AnimatedMarkers() {
  const [visibleMarkers, setVisibleMarkers] = useState<number[]>([])

  useEffect(() => {
    // Animate markers appearing one by one
    activityPoints.forEach((_, index) => {
      setTimeout(() => {
        setVisibleMarkers(prev => [...prev, index])
      }, index * 200)
    })
  }, [])

  return (
    <>
      {activityPoints.map((point, index) => {
        if (!visibleMarkers.includes(index)) return null

        const radius = Math.sqrt(point.members) / 10

        return (
          <CircleMarker
            key={point.city}
            center={[point.lat, point.lng]}
            radius={radius}
            pathOptions={{
              fillColor: '#FFB040',
              fillOpacity: 0.6,
              color: '#E69A30',
              weight: 2
            }}
          >
            <Popup>
              <div className="text-center p-2">
                <h4 className="font-semibold text-bread-900">{point.city}</h4>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="text-gray-500">Members:</span> {point.members.toLocaleString()}</p>
                  <p><span className="text-gray-500">Prayers:</span> {point.prayers.toLocaleString()}</p>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </>
  )
}

export default function KingdomMap() {
  return (
    <div className="h-[500px] rounded-2xl overflow-hidden">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AnimatedMarkers />
      </MapContainer>
    </div>
  )
}
