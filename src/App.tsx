import React, {useRef, useState} from 'react';
import './App.scss';

import Map from "./Map/Map";
import {MapboxGeoJSONFeature} from "mapbox-gl";


function App() {
    const [activeFeature, setActiveFeature] = useState<MapboxGeoJSONFeature | null>(null);
    // node is used to listen to clicks outside of divs, for example, remove highlight
    // from active list element by clicking anywhere outside of the list itself or map canvas
    const node = useRef<HTMLDivElement>(null);

// use this to clear any list item when click even not in target
    function handleClick(e: any) {
        if (e.target.id !== 'app-container') {
            return
        }
        setActiveFeature(null);
    }

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
