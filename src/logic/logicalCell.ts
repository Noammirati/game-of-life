import LogicalGrid from "./logicalGrid";
import { CellState, COORDS_TO_KEY } from "./logicalHelpers";

export default class LogicalCell {
    private x: number;
    private y: number;
    private states: Array<CellState>
    private neighbors: Array<LogicalCell>;

    public constructor(x: number, y: number, state: CellState) {
        this.x = x;
        this.y = y;
        this.states = new Array<CellState>;
        this.states.push(state);
        this.neighbors = new Array<LogicalCell>;
    }

    public set(state: CellState) {
        this.states = new Array<CellState>;
        this.states.push(state);
        return state;
    }

    public reset() {
        const firstState = this.states[0];
        this.states = new Array<CellState>;
        this.states.push(firstState);
        return firstState;
    }

    public computeNextState() {
        //console.log("cell computeNextState");
        if (this.neighbors.length === 0) {
            this.initNeighbors();
        }
        let aliveNs = this.computeAliveNeighborsNumber();
        let nextState;

        if (this.getState() == CellState.alive) {
            if (aliveNs < 2 || aliveNs > 3) {
                nextState = CellState.dead;
            } else {
                nextState = CellState.alive;
            }
        } else {
            if (aliveNs === 3) {
                nextState = CellState.alive;
            } else {
                nextState = CellState.dead;
            }
        }
        this.states.push(nextState)
        return nextState;
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

    private computeAliveNeighborsNumber() {
        if (this.neighbors.length <= 0) {
            this.initNeighbors();
        }
        return this.neighbors.filter((cell) => cell.isAlive()).length;
    }

    private initNeighbors() {
        //console.log("cell initNeighbors");
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