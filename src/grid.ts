const SIZE = 100;
const KEY_FORMAT = 'x:y';
const COORDS_TO_KEY = (x: number, y: number) => KEY_FORMAT.replace('x', `${x}`).replace('y', `${y}`);

export class Cell_ {
    private x: number;
    private y: number;
    private alive: boolean;
    private neighbors: Array<Cell_>;

    init(grid: Grid_) {
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
        if (this.x < 3) {

            console.log(myKey, this.neighbors)
        }
    }

    update() {
        let aliveNeighbors = this.neighbors.filter((cell) => cell.isAlive());
        console.log(this.getKey(), this.alive, aliveNeighbors.length)
        if (this.alive) {
            if (aliveNeighbors.length < 2) {
                this.alive = false;
                console.log("dying")
            }
            if (aliveNeighbors.length > 3) {
                this.alive = false;
                console.log("dying")
            }
        } else {
            if (aliveNeighbors.length = 3) {
                this.alive = true;
                console.log("aliving")
            }
        }
        console.log(this.getKey(), this.alive)
    }

    isAlive() {
        return this.alive;
    }

    getKey() {
        return COORDS_TO_KEY(this.x, this.y);
    }

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.alive = Math.random() < 0.5;
        this.neighbors = new Array<Cell_>;
    }
}

export class Grid_ {
    private gridCells: Cell_[][];
    private cells: Map<string, Cell_>;

    private initCells() {
        const that = this;
        this.cells.forEach((cell) => cell.init(that))
    }

    getGrid() {
        return this.gridCells;
    }

    getCell(key: string) {
        return this.cells.get(key);
    }

    update() {
        this.cells.forEach((cell) => cell.update());
        console.log("UPDATING");
        return this;
    }

    constructor() {
        this.gridCells = new Array<Array<Cell_>>;
        this.cells = new Map<string, Cell_>;

        for (let y = 0; y < (SIZE / 5) * 2; y++) {
            let row: Cell_[] = new Array<Cell_>();
            for (let x = 0; x <= SIZE; x++) {
                let cell = new Cell_(x, y);
                this.cells.set(cell.getKey(), cell)
                row.push(cell);
            }
            this.gridCells.push(row);
        }

        this.initCells();
    }
}