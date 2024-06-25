export default class EdgeAlgorithm {
    constructor(start, end, capacity) {
        this.start = start;
        this.end = end;
        this.weight = parseInt(capacity, 10); // Asegúrate de que sea un número
        this.flow = 0;
    }

    getResidualCapacity() {
        return this.weight - this.flow;
    }

    increaseFlow(amount) {
        this.flow += amount;
    }

    decreaseFlow(amount) {
        this.flow -= amount;
    }
}