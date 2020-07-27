// TODO: darkStyle will be deprecated June 1st. Create a custom style for it

// base styles
const darkStyle = 'mapbox://styles/mapbox/dark-v10';
const customStyle = 'mapbox://styles/jonathanengelbert/ck5egnrfz06cu1iq8x7hyy4uy';

// layer styles
// TODO: add active color argument
class PointStyle {
    private readonly color: string;
    private readonly baseRadius: number;

    constructor(color?: string, baseRadius?: number) {
        this.color = color || "white";
        this.baseRadius = baseRadius || 1.75;
    }

    generateStyle() {
        return {
            // [zoomLevel, circleDiameter]
            "circle-radius": {
                "base": this.baseRadius,
                "stops": [
                    [12, 2],
                    [16, 15],
                    [22, 30]
                ]
            },
            "circle-color": [
                "case",
                ['boolean', ['feature-state', 'hover'], false],
                'white',
                this.color,
            ]
        }
    }
}

class PolygonStyle {
    private readonly fillColor: string;
    private readonly fillOutlineColor: string;
    private readonly fillOpacity: number;

    constructor(fillColor?: string, fillOpacity?: number, fillOutlineColor?: string) {
        this.fillColor = fillColor || "white";
        this.fillOutlineColor = fillOutlineColor || 'black';
        this.fillOpacity = fillOpacity || 0.5;
    }

    generateStyle() {
        return {
            "fill-color": this.fillColor,
            "fill-opacity": this.fillOpacity,
            "fill-outline-color": this.fillOutlineColor,
        }
    }
}

export const mapboxStyles = {
    // baseStyles
    darkStyle: darkStyle,
    customStyle: customStyle,
    // layerStyles
    pointStyle: PointStyle,
    polygonStyle: PolygonStyle,
};


