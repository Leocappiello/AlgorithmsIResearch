export default class EdgeAlgorithm {
    start: string;
    end: string;
    weight: number;

    constructor(start: string, end: string, weight: number) {
        this.start = start;
        this.end = end;
        this.weight = weight;
    }
}