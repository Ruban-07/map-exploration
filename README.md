# Mappls (MapmyIndia) React Integration Guide

This project demonstrates how to integrate the **Mappls Web SDK v3.0** with a **React + TypeScript** application to implement road-perfect routing and custom markers.

## 🚀 Getting Started

### 1. Prerequisites
Before you begin, you need a **Mappls Access Token**.
- Sign up at [Mappls Developer Portal](https://developer.mappls.com/).
- Generate a **Static SDK Key** (Access Token).

### 2. Implementation Steps

#### A. Add SDK Scripts to `index.html`
Mappls requires two library scripts to be loaded in the `<head>` of your application. Replace `YOUR_ACCESS_TOKEN` with your actual key.

```html
<!-- Mappls Basic Map SDK -->
<script src="https://sdk.mappls.com/map/sdk/web?v=3.0&access_token=YOUR_ACCESS_TOKEN"></script>

<!-- Mappls Plugins (Direction library is required for routing) -->
<script src="https://sdk.mappls.com/map/sdk/plugins?v=3.0&libraries=direction&access_token=YOUR_ACCESS_TOKEN"></script>
```

#### B. Handle TypeScript Definitions
Since Mappls is loaded via script tags, you need to tell TypeScript about the `window.mappls` object. Create a file like `src/types/mappls.d.ts`:

```typescript
declare global {
  interface Window {
    mappls: any;
  }
}
export {};
```

#### C. Create the Map Component
The `MapComponent` initializes the map and draws the route once the map has loaded.

**Key Concepts:**
- **Initialization**: Use `new window.mappls.Map('container-id', options)`.
- **Event Listening**: Use `mapInstance.addListener('load', callback)` to ensure the map is ready before adding plugins.
- **Direction Plugin**: Use `window.mappls.direction` to calculate and draw routes along actual road networks.

```tsx
// src/components/MapComponent.tsx
const MapComponent = ({ start, end }) => {
    // 1. Reference to the DOM element
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);

    useEffect(() => {
        // 2. Initialize Map
        mapInstance.current = new window.mappls.Map('map-container', {
            center: { lat: 28.61, lng: 77.23 },
            zoom: 5
        });

        // 3. Add Route on Load
        mapInstance.current.addListener('load', () => {
            addRoute();
        });
    }, []);

    const addRoute = () => {
        window.mappls.direction({
            map: mapInstance.current,
            start: `${start.lat},${start.lng}`,
            end: `${end.lat},${end.lng}`,
            resource: 'route',
            profile: 'driving',
            geometries: 'polyline6', // High accuracy road following
            routeColor: ['#1452ff']  // Custom blue color
        });
    };

    return <div id="map-container" ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};
```

### 3. Key Configuration Options

| Option | Description |
| :--- | :--- |
| `resource: 'route'` | Fetches standard road routing geometry. |
| `geometries: 'polyline6'` | Ensures the path follows the exact road turns (high resolution). |
| `fitBounds: true` | Automatically zooms the map to show the entire route. |
| `animate: true` | Adds a smooth drawing animation to the route line. |

## 🛠️ Common Issues & Fixes

### 1. "Map container not defined"
**Cause**: The SDK tries to find the map `div` before React has rendered it.
**Fix**: Ensure you initialize the map inside a `useEffect` and verify the `id` of your `div` matches what you pass to the constructor.

### 2. "TypeError: window.mappls.direction is not a function"
**Cause**: The plugins script hasn't fully loaded or the `libraries=direction` parameter is missing.
**Fix**: Double-check your `index.html` script tags and implement a small retry delay if the script loads asynchronously.

### 3. Route is a straight line
**Cause**: Using the wrong plugin or incorrect parameters.
**Fix**: Ensure you are using the `direction` plugin with `resource: 'route'` and `geometries: 'polyline6'`.

## 📂 Project Structure
- `src/components/MapComponent.tsx`: The core logic for Map and Routing.
- `src/App.tsx`: Main entry point passing start/end coordinates.
- `index.html`: External SDK dependencies.
