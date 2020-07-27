import React, {useState, useEffect, useRef} from 'react';
import mapboxgl, {MapboxGeoJSONFeature} from 'mapbox-gl'

import {mapboxStyles} from './mapboxStyles'
import {mapUtils} from './mapUtils';
import {popupModelExampleTwo} from './Popup/popupModels';
import SidePopup from './Popup/SidePopup';

import {isEmpty} from "../utils/helpers";

import CircularProgress from "@material-ui/core/CircularProgress";

import './mapStyles.scss';

// layer style definitions
const stationsStyle = new mapboxStyles.pointStyle('red').generateStyle();
const homicideStyle = new mapboxStyles.pointStyle().generateStyle();
const harrisBoundariesStyle = new mapboxStyles.polygonStyle('#4ea1df', 0.2, 'white').generateStyle();
const citiesStyle = new mapboxStyles.polygonStyle('#df1a08', 1, 'white').generateStyle();
const buildingFootprintsStyle = new mapboxStyles.polygonStyle('#43df18', 1, 'white').generateStyle();

type Props = {
    layers: any,
    activeFeature: MapboxGeoJSONFeature | null,
    children?: any;
}

const Map: React.FC<Props> = (props: Props) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<mapboxgl.Map>();
    const [home] = useState(new mapboxgl.LngLat(-95.3900, 29.7752));
    const [currentLocation, setCurrentLocation] = useState({currentLat: null, currentLng: null});
    const [currentFeature, setCurrentFeature] = useState<MapboxGeoJSONFeature | null>(null);


    // map initialization
    useEffect(() => {
        const mapboxKey = process.env.REACT_APP_MAPBOX_KEY;

        if (mapboxKey) {
            mapboxgl.accessToken = mapboxKey;
        }

        const initializeMap = ({setMap, mapContainer}: any) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: mapboxStyles.darkStyle, // stylesheet location
                // style: mapboxStyles.customStyle, // stylesheet location
                center: home,
                zoom: 9
            });

            let hoveredStateId: any;
            map.on("load", () => {
                setMap(map);
                map.resize();
            });
            map.on('move', () => mapUtils.getCoordsCenter(map, setCurrentLocation));
            //hover implementation
            map.on('mouseenter', 'stations', function (e) {

                if (e.features && e.features.length > 0) {
                    if (hoveredStateId) {
                        map.setFeatureState(
                            {source: 'stations', id: hoveredStateId},
                            {hover: false}
                        );
                    }
                    hoveredStateId = e.features[0].id;
                    map.setFeatureState(
                        {source: 'stations', id: hoveredStateId},
                        {hover: true}
                    );
                }
            });

            // When the mouse leaves the stations layer, update the feature state of the
            // previously hovered feature.
            map.on('mouseleave', 'stations', function () {
                if (hoveredStateId) {
                    map.setFeatureState(
                        {source: 'stations', id: hoveredStateId},
                        {hover: false}
                    );
                }
                hoveredStateId = null;
            });
            map.on('click', 'stations', (e) => {
                const popup = mapUtils.makePopupInPlace(e, map, popupModelExampleTwo);
                return(popup);
            });
            map.on('click', 'cities', (e) => {
                console.log(e.features)
            });
        };
        // only create map object once and only if key is provided
        if (!map && mapboxKey) initializeMap({setMap, mapContainer});
    }, [map, home]);

    // layer loading
    useEffect(() => {
        if (!isEmpty(props.layers) && map) {
            for (let l in props.layers) {
                let layer = props.layers[l];
                console.log(layer);

                if (!map.getSource(layer.id)) {
                    map.addSource(
                        layer.id,
                        {
                            "type": "geojson",
                            // server request, from parent component
                            data: layer,
                            // necessary in order to use feature state. Might vary depending on dataset
                            promoteId: 'id'
                        });

                    // layer building: assign style and layer type here
                    if (layer.id === 'stations') {
                        layer = new mapUtils.BuildLayer(layer.id, 'circle', stationsStyle);
                    }

                    if (layer.id === 'homicides') {
                        layer = new mapUtils.BuildLayer(layer.id, 'circle', homicideStyle);
                    }

                    if (layer.id === 'harrisBoundaries') {
                        layer = new mapUtils.BuildLayer(layer.id, 'fill', harrisBoundariesStyle);
                    }

                    if (layer.id === 'cities') {
                        layer = new mapUtils.BuildLayer(layer.id, 'fill', citiesStyle);
                    }

                    if (layer.id === 'buildingFootprints') {
                        layer = new mapUtils.BuildLayer(layer.id, 'fill', buildingFootprintsStyle);
                    }

                    map.addLayer(layer);

                    // handle layer order
                    if (map.getSource('harrisBoundaries') && map.getSource('stations')) {
                        map.moveLayer('harrisBoundaries', 'stations');
                    }
                }
            }
        }
    }, [props.layers, map]);

    // list to map effects
    useEffect(() => {
        if (currentFeature && currentFeature.properties) {
            map?.setFeatureState({source: 'stations', id: currentFeature.properties.id}, {hover: false});
        }
        if (props.activeFeature?.properties) {

            setCurrentFeature(props.activeFeature);

            // see https://stackoverflow.com/questions/55621480/cant-access-coordinates-member-ofocus?: string, f-geojson-feature-collection
            if (props.activeFeature.geometry.type === 'Point') {
                let [long, lat] = props.activeFeature.geometry.coordinates;
                const coordinates = new mapboxgl.LngLat(long, lat);
                map?.jumpTo({center: coordinates, zoom: 18});
                map?.setFeatureState({source: 'stations', id: props.activeFeature.properties.id}, {hover: true});
            }
        }
    }, [map, props.activeFeature, currentFeature]);

    return (
        <div ref={mapContainer}
             id={'map-container'}>
            {/*LOAD MAP ONLY AFTER "map" variable has been initialized. Might need to attach another listener here*/}
            <SidePopup
                activeFeature={props.activeFeature}
            />
            {
                map ?
                    <div className={'map-controls'}>
                        <p>{currentLocation.currentLng} {currentLocation.currentLat} </p>
                        <button onClick={() => map.flyTo({
                            center: home,
                            zoom: 9,
                            bearing: 0,
                            pitch: 0
                        })}>HOME
                        </button>
                    </div>
                    :
                    <CircularProgress className={'spinning-wheel-white'}/>
            }
        </div>
    );
};
export default Map;

