import React, {useEffect, useRef, useState} from 'react';
import './App.scss';

import Map from "./Map/Map";
// import List from "./List/List";
import {isEmpty, getLayer} from "./utils/helpers";
import {Feature} from 'geojson';
import {MapboxGeoJSONFeature} from "mapbox-gl";

// LAYER REQUESTS
const harrisBoundaries = 'http://localhost:8001/harris_boundaries';
const cities = 'https://opendata.arcgis.com/datasets/9004613214d74b5ca757f4cffef597dd_0.geojson';
const buildingFootprints = 'https://koordinates.com/services/query/v1/vector.json?key=d9cb37872f9c45f29a9d52314e934ec6&layer=12890&x=-95.3900&y=29.7752&max_results=3&radius=100000&geometry=true&with_field_names=true';
// const stationsUrl = 'http://localhost:8001/geojson-all-stations';
// const neighborhoodsUrl = 'http://localhost:8001/geojson-all-neighborhoods';
// const homicidesUrl = 'http://localhost:8001/geojson-all-homicides';

function App() {
    const [layers, setLayer] = useState<Array<Feature>>([]);
    const [activeFeature, setActiveFeature] = useState<MapboxGeoJSONFeature | null>(null);
    // node is used to listen to clicks outside of divs, for example, remove highlight
    // from active list element by clicking anywhere outside of the list itself or map canvas
    const node = useRef<HTMLDivElement>(null);

    async function addLayer(endPoint: string, layerName: string) {
        let data = await getLayer(endPoint, layerName);
        // case for koordinates API
        if(data.vectorQuery) {
          data = data.vectorQuery.layers[12890];
          data.id = 'buildingFootprints';
        }

        setLayer((layers) => {
            let layerExists = false;
            layers.forEach(l => {
                if (l.id === data.id) {
                    layerExists = true
                }
            });

            if (layerExists) {
                return layers;
            }
            return [...layers, data];
        });
        // data is made available as a return value, but by default is added to
        // stateful layers array
        // return data;
    }

// use this to clear any list item when click even not in target
    function handleClick(e: any) {
        if (e.target.id !== 'app-container') {
            return
        }
        setActiveFeature(null);
    }

    useEffect(() => {
        // add any datasets for initial load here
        const initialDataLoad = () => {
            // addLayer(stationsUrl, 'stations');
            addLayer(harrisBoundaries, 'harrisBoundaries');
            addLayer(cities, 'cities');
            addLayer(buildingFootprints, 'buildingFootprints');
        };

        if (isEmpty(layers)) {
            initialDataLoad();
        }
    }, [layers]);

    return (
        <div
            id={'app-container'}
            ref={node}
            onClick={e => handleClick(e)}
            className="App"
        >
            {/*This button demonstrates that data can be requested on click as well*/}
            {/*<button onClick={async () => addLayer(homicidesUrl, 'homicides')}>GET DATA</button>*/}
            <div className={'map-container'}>
                <Map
                    layers={layers}
                    activeFeature={activeFeature}
                />
            </div>
            <div className={'list-container'}>
                {/*when using the List element, make sure to filter layer*/}
                {/*by its id */}
                {/*<List*/}
                {/*    data={layers.filter(e => e.id === 'stations')}*/}
                {/*    setActiveFeature={setActiveFeature}*/}
                {/*    activeFeature={activeFeature}*/}
                {/*/>*/}
            </div>
        </div>
    );
}

export default App;
