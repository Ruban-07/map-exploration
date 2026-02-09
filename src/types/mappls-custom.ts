declare global {
    interface Window {
        mappls: any;
    }
}

export interface MapProps {
    id: string;
    properties?: {
        center?: [number, number];
        zoom?: number;
        traffic?: boolean;
        zoomControl?: boolean;
        geolocation?: boolean;
        clickableIcons?: boolean;
    };
}

export interface MarkerProps {
    map: any;
    position: { lat: number; lng: number };
    icon?: string;
    width?: number;
    height?: number;
    fitbounds?: boolean;
    popupHtml?: string;
    clusters?: boolean;
    html?: string;
}

export interface PolylineProps {
    map: any;
    path: { lat: number; lng: number }[];
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    fitbounds?: boolean;
    lineGap?: number;
    animate?: {
        duration?: number;
        repeat?: number;
    }
}

export interface DirectionProps {
    map: any;
    start: string | { lat: number; lng: number };
    end: string | { lat: number; lng: number };
    resource?: 'route_eta' | 'route_traffic';
    profile?: 'driving' | 'biking' | 'walking' | 'trucking';
    geometry?: 'simplify' | 'polyline6' | 'polyline5';
    gap?: number;
    strokeWeight?: number;
    strokeColor?: string;
}
