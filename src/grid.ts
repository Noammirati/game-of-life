const SIZE = 100;
const KEY_FORMAT = 'x:y';
const COORDS_TO_KEY = (x: number, y: number) => KEY_FORMAT.replace('x', `${x}`).replace('y', `${y}`);

enum cellState { dead, alive };
export class Cell_ {
    private x: number;
    private y: number;
    private alive: boolean;
    private neighbors: Array<Cell_>;

    init(grid: Grid_) {
        console.log("cell init");
        let myKey = this.getKey();
        for (let i = -1; i < 2; i++) {
            for (let ii = -1; ii < 2; ii++) {
                let tKey = COORDS_TO_KEY(this.x + i, this.y + ii);
                if (tKey != myKey) {
                    let tCell = grid.getCell(tKey);
                    if (typeof (tCell) != 'undefined') {
                        this.neighbors.push(tCell)
                    }
                }
            }
        }
    }

    update() {
        console.log("cell update");
        let aliveNeighbors = this.neighbors.filter((cell) => cell.isAlive());
        if (this.alive) {
            if (aliveNeighbors.length < 2) {
                this.alive = false;
            }
            if (aliveNeighbors.length > 3) {
                this.alive = false;
            }
        } else {
            if (aliveNeighbors.length = 3) {
                this.alive = true;
            }
        }
    }

    clear() {
        console.log("cell clear");
        this.alive = false;
    }

    isAlive() {
        return this.alive;
    }

    getKey() {
        return COORDS_TO_KEY(this.x, this.y);
    }

    constructor(x: number, y: number, state?: cellState) {
        console.log("cell constructor", state);
        this.x = x;
        this.y = y;

        // Random state by default
        this.alive = Math.random() < 0.5;
        if (!(typeof(state) === undefined)) {
            if (state === cellState.alive) this.alive = true;
            else if (state === cellState.dead) this.alive = false;
        }

        this.neighbors = new Array<Cell_>;
    }
}

export class Grid_ {
    private gridCells: Cell_[][];
    private cells: Map<string, Cell_>;

    private initCells() {
        console.log("grid initCells");
        const that = this;
        this.cells.forEach((cell) => cell.init(that))
    }

    getGrid() {
        //console.log("grid getGrid");
        return this.gridCells;
    }

    getCell(key: string) {
        //console.log("grid getCell", key);
        return this.cells.get(key);
    }

    setCells(state?: cellState) {
        console.log("grid setCells", state);
        this.cells.clear();
        this.gridCells = new Array<Array<Cell_>>;

        for (let y = 0; y < (SIZE / 5) * 2; y++) {
            let row: Cell_[] = new Array<Cell_>();
            for (let x = 0; x <= SIZE; x++) {
                let cell = new Cell_(x, y, state);
                this.cells.set(cell.getKey(), cell)
                row.push(cell);
            }
            this.gridCells.push(row);
        }

    }

    update() {
        console.log("grid update");
        this.cells.forEach((cell) => cell.update());
        return new Grid_(this);
    }

    randomize() {
        console.log("grid randomize");
        this.setCells();
        return new Grid_(this);
    }

    clear() {
        console.log("grid clear");
        this.setCells(cellState.dead);
        console.log("CLEARED", this.cells)
        return new Grid_(this);
    }

    fill() {
        console.log("grid fill");
        this.setCells(cellState.alive);
        return new Grid_(this);
    }

    constructor(grid?: Grid_) {
        console.log("grid constructor", grid);
        if (grid) {
            this.cells = grid.cells;
            this.gridCells = grid.gridCells;
        } else {
            this.gridCells = new Array<Array<Cell_>>;
            this.cells = new Map<string, Cell_>;
            this.setCells();
            this.initCells();
        }
    }
}