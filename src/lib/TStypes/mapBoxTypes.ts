export interface Mapbox {
	accessToken?: string;
	map?: unknown;
	style?: string;
	version?: string;
	customStylesheetUrl?: boolean;
	zoom?: number;
	getMap?: () => unknown;
	getMapbox?: () => unknown;
	center?: number[];
	zoomRate?: number;
	wheelZoomRate?: number;
	fitBounds?: (bbox: unknown, data?: { [key: string]: unknown }) => void;
	flyTo?: (destination: unknown, data?: { [key: string]: unknown }) => void;
	resize: () => void;
	setCenter: (coords: unknown, data?: { [key: string]: unknown }) => void;
	setZoom: (value: unknown, data?: { [key: string]: unknown }) => void;
	addControl: (control: unknown, position?: string) => void;
	options?: { [key: string]: unknown };
}
