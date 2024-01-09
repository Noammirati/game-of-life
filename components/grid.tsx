import { Grid_, Cell_ } from '@/src/grid';
import Cell from './cell';
import { useState } from 'react';


export default function Grid() {
    const [grid, setGrid] = useState(new Grid_());

    function renderLine(line: Array<Cell_>, index : number) {
        return (
            <div key={index} className='grid___line'>
                {line.map((cell) => <Cell key={cell.getKey()} data={cell} />)}
            </div>
        )
    }

    function update() {
        console.log("UPDATE IN COMPONENT");
        setGrid(grid.update())
    }

    return (
        <div className="grid">
            <button onClick={(e) => update()}>Update</button>
            {grid.getGrid().map((line, index) => renderLine(line, index))}
        </div>
    )
}