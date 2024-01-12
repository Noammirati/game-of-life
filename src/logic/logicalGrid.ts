import LogicalCell from "./logicalCell";
import { CellState, SIZE } from "./logicalHelpers";

export default class LogicalGrid {
    private static instance: LogicalGrid;
    private cells: Map<string, LogicalCell>;
    private rows: Array<Array<LogicalCell>>;
    private frameIndex: number;
    private frameStates: Array<Array<Array<CellState>>>;

    private constructor() {
        console.log("Constructor grid")
        this.cells = new Map();
        this.rows = new Array();
        this.frameIndex = 0;
        this.frameStates = new Array();

        const firstFrame = new Array();
        for (let y = 0; y < (SIZE / 3) * 2; y++) {
            let row = [];
            let rowStates = [];
            for (let x = 0; x < SIZE; x++) {
                const randomState = Math.random() < 0.5 ? CellState.alive : CellState.dead;
                let cell = new LogicalCell(x, y, randomState);
                row.push(cell);
                rowStates.push(randomState);
                this.cells.set(cell.getKey(), cell)
            }
            this.rows.push(row);
            firstFrame.push(rowStates);
        }

        this.frameStates.push(firstFrame);
    }

    public static getInstance() {
        if (LogicalGrid.instance) {
            return LogicalGrid.instance;
        }
        LogicalGrid.instance = new LogicalGrid();
        return LogicalGrid.instance;
    }

    public update() {
        console.log("grid update");
        const nextFrame = this.rows.map((row) => row.map((cell) => cell.computeNextState()));
        this.frameStates.push(nextFrame);
        this.frameIndex++;
        return nextFrame;
    }

    public reset(state: CellState) {
        console.log('grid reset');
        this.cells.forEach((cell) => cell.reset(state));
        this.frameIndex = 0;
        this.frameStates = new Array();
    }

    public getFrameIndex() {
        return this.frameIndex;
    }

    public getCells() {
        return this.frameStates[this.frameIndex];
    }

    public getCell(key: string) {
        return this.cells.get(key);
    }
}