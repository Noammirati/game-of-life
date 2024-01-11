import LogicalCell from "./logicalCell";
import { CellState } from "./logicalHelpers";

export default class LogicalGrid {
    private static instance: LogicalGrid;
    private cells: Map<string, LogicalCell>;
    private rows: Array<Array<LogicalCell>>;
    private frameIndex : number;

    private constructor() {
        console.log("Constructor grid")
        this.cells = new Map<string, LogicalCell>;
        this.rows = new Array<Array<LogicalCell>>;
        this.frameIndex = 0;

        for (let y = 0; y < 10; y++) {
            let row = [];
            for (let x = 0; x < 16; x++) {
                let cell = new LogicalCell(x, y);
                row.push(cell);
                this.cells.set(cell.getKey(), cell)
            }
            this.rows.push(row);
        }
    }

    public static getInstance() {
        if (LogicalGrid.instance) {
            return LogicalGrid.instance;
        }
        LogicalGrid.instance = new LogicalGrid();
        return LogicalGrid.instance;
    }

    public reset(state?: CellState) {
        console.log('grid reset');
        this.cells.forEach((cell) => cell.reset(state));
        this.frameIndex = 0;       
    }

    public getFrameIndex(){
        return this.frameIndex;
    }

    public getCells() {
        return this.cells;
    }

    public getCell(key: string) {
        return this.cells.get(key);
    }

    public getRows() {
        return this.rows;
    }    
}