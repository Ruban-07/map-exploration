
# MapmyIndia (Mappls) Integration Guide

This guide details the implementation of MapmyIndia (Mappls) maps in a React application using the official Web JS SDK, without any third-party npm wrappers.

## Prerequisites

-   **Mappls API Key**: You need a static key or OAuth 2.0 credentials.
    -   Current Static Key: `nfxyrliwognahuyywbbnkzhpomzcpgxjvymp`

## Implementation Steps

### 1. Add Mappls SDK Script

Add the following script tags to your `index.html` file inside the `<head>` section. The first script loads the core map SDK, and the second loads the direction plugin required for routing.

```html
<script src="https://sdk.mappls.com/map/sdk/web?v=3.0&access_token=nfxyrliwognahuyywbbnkzhpomzcpgxjvymp"></script>
<script src="https://sdk.mappls.com/map/sdk/plugins/v3.0?libraries=direction&access_token=nfxyrliwognahuyywbbnkzhpomzcpgxjvymp"></script>
```

### 2. Configure TypeScript Types

Since we are not using an npm package with built-in types, we need to declare the `mappls` global object on the `window` interface.

Create or update `src/types/mappls-custom.ts`:

```typescript
declare global {
    interface Window {
        mappls: any;
    }
}
export {};
```

### 3. Implement the Map Component

The map component initializes the map instance and adds markers/routes.

**File:** `src/components/MapComponent.tsx`

#### Initialization Logic

1.  **Wait for SDK**: Use a `useEffect` hook to check if `window.mappls.Map` is available.
2.  **Initialize Map**: Create the map instance.
3.  **Add Route & Markers**:
    -   **Primary Method (Direction Plugin)**: If `window.mappls.direction` is available, this plugin is used. It automatically calculates the route, draws the polyline following the road network, and adds start/end markers.
    -   **Fallback Method**: If the plugin fails to load, the code falls back to manually adding markers and drawing a straight-line polyline.

### 4. Code Structure

-   `src/index.html`: Contains the SDK script.
-   `src/components/MapComponent.tsx`: React component wrapping the map logic.
-   `src/App.tsx`: Parent component passing start/end coordinates.

## Notes

-   **Direction Plugin**: For full turn-by-turn routing, ensure you have access to the `direction` API. The current implementation attempts to use it and falls back to a straight line if unavailable.
-   **Styling**: The map container must have a defined `width` and `height`.

## Official Documentation

-   [Mappls Web JS SDK Documentation](https://developer.mappls.com/documentation/sdk/Web/Web%20JS/)
