import LogicalGrid from "./logicalGrid";
import { CellState, COORDS_TO_KEY } from "./logicalHelpers";

export default class LogicalCell {
    private x: number;
    private y: number;
    private states: Array<CellState>
    private neighbors: Array<LogicalCell>;

    public constructor(x: number, y: number, state?: CellState) {
        this.x = x;
        this.y = y;
        this.states = new Array<CellState>;
        this.states.push(this.computeResetState(state));
        this.neighbors = new Array<LogicalCell>;
    }

    public reset(state?: CellState) {
        this.states = new Array<CellState>;
        this.states.push(this.computeResetState(state));
    }

    public computeNextState() {
        console.log("cell computeNextState");
        if (this.neighbors.length <= 0) {
            this.initNeighbors();
        }
        let aliveNs = this.computeAliveNeighborsNumber();
        console.log(this.getKey(), aliveNs);
        if (this.getLastComputedState() == CellState.alive) {
            if (aliveNs < 2 || aliveNs > 3) {
                console.log("dying");
                this.states.push(CellState.dead)
            } else {
                console.log("stay alive");
                this.states.push(CellState.alive)
            }
        } else {
            if (aliveNs === 3) {
                console.log("aliving");
                this.states.push(CellState.alive);
            } else {
                console.log("staying dead");
                this.states.push(CellState.dead)
            }
        }
    }

    public isAlive() {
        return this.getState() === CellState.alive;
    }

    public getState() {
        return this.states[LogicalGrid.getInstance().getFrameIndex()];
    }

    public getKey() {
        return COORDS_TO_KEY(this.x, this.y);
    }

    public computeAliveNeighborsNumber() {
        if (this.neighbors.length <= 0) {
            this.initNeighbors();
        }
        return this.neighbors.filter((cell) => cell.isAlive()).length;
    }

    private computeResetState(state?: CellState) {
        return state === undefined ? (Math.random() < 0.5 ? CellState.alive : CellState.dead) : state;
    }

    private getLastComputedState() {
        return this.states[this.states.length - 1];
    }

    private initNeighbors() {
        console.log("cell initNeighbors");
        let myKey = this.getKey();
        for (let i = -1; i < 2; i++) {
            for (let ii = -1; ii < 2; ii++) {
                let tKey = COORDS_TO_KEY(this.x + i, this.y + ii);
                if (tKey != myKey) {
                    let tCell = LogicalGrid.getInstance().getCell(tKey);
                    if (typeof (tCell) != 'undefined') {
                        this.neighbors.push(tCell)
                    }
                }
            }
        }
    }
}