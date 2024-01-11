export const SIZE = 10;
export const KEY_FORMAT = 'x:y';
export const COORDS_TO_KEY = (x: number, y: number) => KEY_FORMAT.replace('x', `${x}`).replace('y', `${y}`);


export class CellState {
    public static dead = new CellState('dead');
    public static alive = new CellState('alive');

    private state: string;

    private constructor(state: string) {
        this.state = state;
    }

    public toString() {
        return `CellState.${this.state}`;
    }
}