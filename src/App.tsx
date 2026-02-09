import { useState, useEffect } from 'react'
import MapComponent from './components/MapComponent'
import './App.css'

function App() {
  const [tripData, setTripData] = useState<{ from: { lat: number, lng: number }, to: { lat: number, lng: number } } | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setTripData({
        from: { lat: 10.9974, lng: 76.9589 },
        to: { lat: 17.4065, lng: 78.4772 }
      });
    }, 100);
  }, []);

  if (!tripData) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading map...</div>;

  return (
    <div className="app-container">
      <MapComponent start={tripData.from} end={tripData.to} />
    </div>
  )
}

export default App
