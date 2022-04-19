export declare const STROKE = "#000000";
export declare const FILL = "rgba(255, 255, 255, 0.0)";
export declare const CIRCLE: {
    radius: number;
    left: number;
    top: number;
    fill: string;
    stroke: string;
};
export declare const RECTANGLE: {
    left: number;
    top: number;
    fill: string;
    stroke: string;
    width: number;
    height: number;
    angle: number;
};
export declare const LINE: {
    points: number[];
    options: {
        left: number;
        top: number;
        stroke: string;
    };
};
export declare const TEXT: {
    type: string;
    left: number;
    top: number;
    fontSize: number;
    fontFamily: string;
    fill: string;
};
