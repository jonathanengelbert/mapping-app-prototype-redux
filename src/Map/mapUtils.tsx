import mapboxgl, {EventData, MapMouseEvent, Popup} from "mapbox-gl";
import {Layer,} from "mapbox-gl";

// Get coordinates from center of the canvas
// Optionally trigger state setter
const getCoordsCenter = (map: mapboxgl.Map, stateSetter?: Function) => {
    if (!map) return;
    const [lng, lat] = [map.getCenter().lng.toFixed(4), map.getCenter().lat.toFixed(4)];
    if (stateSetter) {
        return stateSetter({currentLng: lng, currentLat: lat});
    }
    return [lng, lat];
};


// Creates and injects feature properties into HTML element or popup
const makePopupContent = (feature: any, popupModel: Function) => {
    if (!feature) return;
    const properties = feature[0].properties || null;
    return popupModel(properties);
};

// Creates a small popup under mouse pointer and adds it to map. This uses the default
// popup from Mapbox GL/Leaflet
// close on click is set to true by default below
const makePopupInPlace = (e: MapMouseEvent&EventData, map: mapboxgl.Map, popupModel: Function): Popup => {
    let popup: Popup;
    const popupContent = makePopupContent(e.features, popupModel);
    // sets popup in under mouse pointer
    const coords = new mapboxgl.LngLat(e.lngLat.lng, e.lngLat.lat);
    popup = new mapboxgl.Popup({closeOnClick: true})
        .setLngLat(coords)
        .setHTML(popupContent!)
        .addTo(map);

    return popup;
};

class BuildLayer implements Layer {
    id: string;
    source: string;
    type: any;
    paint: Object;

    constructor(id: string, type: any, paint: Object) {
        this.id = id;
        this.source = id;
        this.type = type;
        this.paint = paint;
    }
}

export const mapUtils = {
    getCoordsCenter: getCoordsCenter,
    makePopupInPlace: makePopupInPlace,
    BuildLayer: BuildLayer
};


