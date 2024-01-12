import Cell from './cell';
import { useEffect, useState } from 'react';
import { CellState } from '../logic/logicalHelpers';
import LogicalGrid from '../logic/logicalGrid';

export default function Grid() {
    const [intervalID, setIntervalID]: [null, Function] = useState(null);
    //const [frameIndex, setframeIndex]: [number, Function] = useState(0);

    const [grid, setGrid]: [any, Function] = useState(null);
    const [cells, setCells]: [any, Function] = useState([])

    useEffect(() => {
        const g = LogicalGrid.getInstance();
        setCells(g.getCells());
        setGrid(g);
    }, []);

    function play() {
        if (!intervalID) {
            console.log("PLAY");
            let int = setInterval(update, 300);
            setIntervalID(int)
        } else {
            console.log("STOP PLAY");
            clearInterval(intervalID);
            setIntervalID(null);
        }
    }



    function update() {
        console.log("UPDATE");
        setCells(grid.update());;
        console.log("UPDATED")
    }

    return (
        <>
            {/* <button onClick={(e) => clear()}>Clear</button>
            <button onClick={(e) => fill()}>Fill</button>
            <button onClick={(e) => randomize()}>Randomize</button>
            
            
             */}

            <button onClick={(e) => update()}>Update</button>
            <button onClick={(e) => play()}>Play</button>

            <div className='grid'>
                {cells ? cells.map((row: CellState[], rowIndex: number) => {
                    return <div key={rowIndex} className='grid___line'> {
                        row.map(((cellState: CellState, colIndex: number) => {
                            return <Cell key={`${rowIndex}:${colIndex}`} state={cellState} />
                        }))}
                    </div>
                }) : 'Loading'}
            </div>
        </>
    )
}

// let height = frame.getGrid().getHeight();
//let width = frame.getGrid().getWidth();

// function update() {
//     console.log("UPDATE");
//     setFrame(frame.getNext())
//     frame.next();
// }



// function randomize() {
//     console.log("RANDOMIZE");
//     setGrid(grid.randomize());
// }

// function clear() {
//     console.log("CLEAR");
//     let tgrid = grid.clear();
//     console.log("HERE", tgrid)
//     setGrid(tgrid);
//     console.log("THERE", grid)
// }

// function fill() {
//     console.log("Fill");
//     setGrid(grid.fill());
// }
