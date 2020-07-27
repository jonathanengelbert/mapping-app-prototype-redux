
// test if object is empty
export function isEmpty(obj: Object) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

// LAYER HANDLING
// async fuction to retrieve layer from an endpoint
export const getLayer: Function = async (url: string, id: string, setter: Function) => {
    // handle abscence of parameters
    if (!id || !url) {
        throw new Error ('Layer ID or URL missing. ' +
            'Did you pass these values when requesting the layer?');
    }
    const response = await fetch(url);
    const processing = await response.json();
    processing.id = id;
    return processing;
};

