import LogicalGrid from '@/src/logicalGrid';
import Cell from './cell';
import { RefObject, createRef, useState } from 'react';
import LogicalCell from '@/src/logicalCell';


export default function Grid() {
    const [intervalID, setIntervalID]: [any, Function] = useState(null);
    const [frameIndex, setframeIndex]: [number, Function] = useState(0);

    const grid = LogicalGrid.getInstance();

    const cellRefs : Map<string, RefObject<Cell>> = new Map<string, RefObject<Cell>>();

    for (let cellKey of grid.getCells().keys()){
        cellRefs.set(cellKey, createRef<Cell>())
    }

    const changeChildState = () => {
        console.log("Change child state", cellRefs);
        cellRefs.forEach((ref) => ref.current?.update());
    }

    function update() {
        console.log("UPDATE");
        grid.update();
        changeChildState();
    }

    function renderRow(row: Array<LogicalCell>, index: number) {
        return (
            <div key={index} className='grid___line'>
                {row.map((cell) => <Cell ref={cellRefs.get(cell.getKey())} key={cell.getKey()} data={cell} />)}
            </div>
        )
    }

    return (
        <>
            {/* <button onClick={(e) => clear()}>Clear</button>
            <button onClick={(e) => fill()}>Fill</button>
            <button onClick={(e) => randomize()}>Randomize</button>
            <button onClick={(e) => play()}>Play</button>
             */}

            <button onClick={(e) => update()}>Update</button>

            <div className='grid'>
                {grid.getRows().map((row: LogicalCell[], index: number) => renderRow(row, index))}
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

// function play() {
//     console.log("PLAY");
//     if (!intervalID) {
//         let int = setInterval(update, 500);
//         setIntervalID(int)
//     } else {
//         clearInterval(intervalID);
//         setIntervalID(null);
//     }
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

// function handleFrameIndexChange = (e) => {
//     this.set
// }
