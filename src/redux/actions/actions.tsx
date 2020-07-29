import types from '../actionTypes'

import {MapboxGeoJSONFeature} from "mapbox-gl";

export const addLayerAction = (layer:MapboxGeoJSONFeature) => {
    return {
        type: types.ADD_LAYER,
        layer
    }
}


