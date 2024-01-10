import { Grid_, Cell_ } from '@/src/grid';
import Cell from './cell';
import { useState } from 'react';


export default function Grid() {
    const [grid, setGrid]: [any, Function] = useState(new Grid_());
    const [intervalID, setIntervalID]: [any, Function] = useState(null);

    function update() {
        console.log("UPDATE");
        setGrid(grid.update())
    }

    function play() {
        console.log("PLAY");
        if (!intervalID) {
            let int = setInterval(update, 500);
            setIntervalID(int)
        } else {
            clearInterval(intervalID);
            setIntervalID(null);
        }
    }

    function randomize() {
        console.log("RANDOMIZE");
        setGrid(grid.randomize());
    }

    function clear() {
        console.log("CLEAR");
        let tgrid = grid.clear();
        console.log("HERE", tgrid)
        setGrid(tgrid);
        console.log("THERE", grid)
    }

    function fill() {
        console.log("Fill");
        setGrid(grid.fill());
    }

    function renderLine(line: Array<Cell_>, index: number) {
        return (
            <div key={index} className='grid___line'>
                {line.map((cell) => <Cell key={cell.getKey()} data={cell} />)}
            </div>
        )
    }

    return (
        <>
            <button onClick={(e) => clear()}>Clear</button>
            <button onClick={(e) => fill()}>Fill</button>
            <button onClick={(e) => randomize()}>Randomize</button>
            <button onClick={(e) => play()}>Play</button>
            <button onClick={(e) => update()}>Update</button>

            <div className='grid'>
                {grid.getGrid().map((line: Cell_[], index: number) => renderLine(line, index))}
            </div>
        </>
    )
}