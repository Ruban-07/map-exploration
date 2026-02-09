
import { useEffect, useRef, useState } from 'react';
import '../types/mappls-custom';

interface MapProps {
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
}

const MapComponent = ({ start, end }: MapProps) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);


    useEffect(() => {
        const initMap = () => {
            if (!mapRef.current) return;
            if (mapInstance.current) return;

            if (window.mappls && window.mappls.Map) {
                console.log("Initializing Mappls Map...");

                try {
                    mapInstance.current = new window.mappls.Map('map-container', {
                        center: { lat: (start.lat + end.lat) / 2, lng: (start.lng + end.lng) / 2 },
                        zoom: 5,
                        zoomControl: false,
                        geolocation: false,
                        traffic: false,
                        clickableIcons: false
                    });

                    mapInstance.current.on('load', () => {
                        console.log("Map loaded successfully");
                        setIsMapLoaded(true);
                        addMarkersAndRoute();
                    });

                } catch (e) {
                    console.error("Error initializing map:", e);
                }
            } else {
                console.log("window.mappls not available yet. Retrying...");
                setTimeout(initMap, 500);
            }
        };

        initMap();

        return () => {
            if (mapInstance.current) {

            }
        };
    }, []);

    // Effect to update markers/route if start/end changes
    useEffect(() => {
        if (isMapLoaded && mapInstance.current) {
            addMarkersAndRoute();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [start, end, isMapLoaded]);

    const addMarkersAndRoute = () => {
        if (!mapInstance.current || !window.mappls) return;

        // Route using Direction Plugin
        if (window.mappls.direction) {
            console.log("Using Direction Plugin for Route & Markers...");

            const directionObj = {
                map: mapInstance.current,
                start: `${start.lat},${start.lng}`,
                end: `${end.lat},${end.lng}`,
                resource: 'route', // Use standard 'route' for road routing
                profile: 'driving',
                geometries: 'polyline6', // High-precision geometry for proper roads
                routeColor: ['#1452ff'], // Modern blue like Google Maps
                strokeWidth: [6],
                fitBounds: true,
                animate: true,
                // Custom Markers for Start and End
                start_icon: {
                    html: `<div style="width: 20px; height: 20px; background: white; border: 5px solid #1452ff; border-radius: 50%; box-shadow: 0 0 5px rgba(0,0,0,0.3);"></div>`,
                    width: 30,
                    height: 30
                },
                end_icon: {
                    html: `<div style="display: flex; flex-direction: column; align-items: center;">
                             <div style="width: 35px; height: 35px; background: #ef4444; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; color: white;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                             </div>
                           </div>`,
                    width: 40,
                    height: 50
                }
            };

            window.mappls.direction(directionObj, (data: any) => {
                console.log("Direction Data Response:", data);
            });

        } else {
            console.warn("Direction plugin not found. Retrying in 1 second...");
            setTimeout(addMarkersAndRoute, 1000);
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '500px', background: '#e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            {!isMapLoaded && (
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    zIndex: 10, color: '#4b5563', fontWeight: '500'
                }}>
                    Loading Map...
                </div>
            )}
            <div id="map-container" ref={mapRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default MapComponent;
