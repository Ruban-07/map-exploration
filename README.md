# Map-Exploration: MapmyIndia (Mappls) React Integration

A pixel-perfect implementation of a Mileage Calculator and Route Map using Mappls (MapmyIndia) SDK in a React + TypeScript environment. This project demonstrates how to integrate the Mappls Web Map SDK to visualize a route between two locations, complete with a custom UI overlay for trip details.

## 🚀 Features

- **Interactive Map**: Renders a full-screen map using Mappls SDK.
- **Route Visualization**: Draws a precise polyline between a starting point (Adyar, Chennai) and a destination (Tambaram, Chennai) using the `mappls-direction-plugin`.
- **Pixel-Perfect UI**: Includes a "Mileage Calculator" card overlay that matches the provided design specifics (project details, timeline, reimbursement controls) using CSS Modules for scoped, leak-proof styling.
- **Mock Backend Integration**: Simulates fetching trip data (coordinates) from a backend service.
- **Modular Architecture**: Built with React best practices, keeping UI and Map logic separate.
- **Type Safety**: Fully typed with TypeScript (no `any` where avoidable, custom interfaces for Mappls).

---

## 🛠 Technology Stack

- **Framework**: React 19 (Vite)
- **Language**: TypeScript 5
- **Map Provider**: MapmyIndia (Mappls) Web SDK (`mappls-web-maps`)
- **Icons**: Lucide React
- **Styling**: CSS Modules (Vanilla CSS)

---

## ⚙️ Installation & Setup

Follow these steps to run the application locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Steps

1.  **Clone the repository** (if applicable) or navigate to the project directory:
    ```bash
    cd map-exploration
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Visit `http://localhost:5173` to view the application.

---

## 📖 Complete Integration Guide

This guide is written for anyone, including beginners, to understand how to integrate MapmyIndia into a React application.

### Step 1: Account Setup
1.  Create an account at [MapmyIndia Developer Portal](https://about.mappls.com/api/).
2.  Navigate to the Dashboard and create a new Application.
3.  Obtain your **API Key** (also known as MMI Token or License Key). For this project, we used the static key provided.

### Step 2: Install SDK
In your React project, install the official package:
```bash
npm install mappls-web-maps
```

### Step 3: Create the Map Component
Create a reusable `MapComponent.tsx`. This component handles the map life-cycle.

**Key Concepts:**
- **Initialization**: You must call `new mappls()` inside a `useEffect` hook.
- **Authentication**: Use `mapObject.initialize("<YOUR_KEY>", callback)` to authenticate.
- **Rendering**: Inside the callback, use `mapObject.Map({ id: "map-div-id", ... })` to render the map.
- **Cleanup**: Always clean up map instances when the component unmounts to prevent memory leaks.

### Step 4: Adding Directions (Polyline)
To draw a route like in the screenshot:
1.  Wait for the map `load` event.
2.  Instantiate the plugin: `new mappls_plugin()`.
3.  Call `direction()` with start and end coordinates.
    ```typescript
    directionPlugin.direction({
        map: mapInstance,
        start: "13.0012,80.2565", // Lat,Lng
        end: "12.9229,80.1275",
        resource: 'route_eta',    // Calculate precise route
        profile: 'driving',       // Mode of transport
        strokeColor: '#2563eb',   // Custom blue color
        strokeWeight: 7
    });
    ```

### Step 5: Handling Types
Since the library might lack some types, define interfaces for your props:
```typescript
interface MapProps {
    start: { lat: number; lng: number };
    end: { lat: number; lng: number };
}
```
Avoid using `any` type to ensure your code is robust and catch errors early.

---

## ⚠️ Limitations & Pricing

### Pricing Details
MapmyIndia (Mappls) is generally cost-effective (approx. 30% cheaper than Google Maps).

- **Free Tier**: Limited usage for testing.
- **Professional Plan**: ~₹10,000/month for ~500k transactions.
- **Business Plan**: ~₹30,000/month for higher volume.
- **Enterprise**: Custom pricing for large scale.

*Note: Pricing is subject to change. Check specific country availability (Not available in China, Pakistan, Afghanistan).*

### Technical Limitations
1.  **React StrictMode**: In development, React mounts components twice. Ensure your map initialization logic checks if the map is already loaded (`if (mapInstance.current) return;`) to avoid double rendering.
2.  **API Keys**: Keys are domain-restricted. Ensure your local environment (`localhost`) is allowed in the Mappls dashboard settings.
3.  **Styling**: The default Mappls CSS is injected automatically. Overriding specific map markers requires careful CSS selectors or custom marker implementation.

---

## 📂 Project Structure

```
src/
├── components/
│   ├── MapComponent.tsx      # Handles MapmyIndia logic
│   ├── MileageCard.tsx       # The UI overlay card
│   └── MileageCard.module.css # Scoped styles for the card
├── App.tsx                   # Main layout and data fetching
├── App.css                   # Global app styles
└── types/                    # TypeScript definitions
    └── mappls-custom.ts
```

This implementation ensures a scalable, type-safe, and visually stunning map integration.
