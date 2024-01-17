import Cell from './cell';
import { useEffect, useState } from 'react';
import { CellState } from '@/src/logic/logicalHelpers';
import LogicalGrid from '@/src/logic/logicalGrid';
import Button from '@/components/ui/buttons/button';
import { NextButton, PlayButton, PauseButton, ResetButton } from '@/components/ui/buttons/iconButton';

export default function Grid(this: any) {
    const [intervalID, setIntervalID]: [null, Function] = useState(null);
    const isRunning = () => { return intervalID !== null };

    const [grid, setGrid]: [any, Function] = useState(null);
    const [cells, setCells]: [any, Function] = useState([])

    useEffect(() => {
        const g = LogicalGrid.getInstance();
        setCells(g.getCells());
        setGrid(g);
    }, []);

    function update() {
        //console.log("UPDATE");
        setCells(grid.update());
        //console.log("UPDATED")
    }

    function pause() {
        if (intervalID) {
            clearInterval(intervalID);
            setIntervalID(null);
        }
    }

    function play() {
        if (!intervalID) {
            //console.log("PLAY");
            let int = setInterval(update, 300);
            setIntervalID(int)
        } else {
            //console.log("STOP PLAY");
            clearInterval(intervalID);
            setIntervalID(null);
        }
    }

    function reset() {
        //console.log("RESET")
        pause();
        setCells(grid.reset());
        //console.log("RESETED")
    }

    function clear() {
        //console.log("CLEAR")
        pause();
        setCells(grid.setAll(CellState.dead));
        //console.log("CLEARED")
    }

    function fill() {
        //console.log("FILL")
        pause();
        setCells(grid.setAll(CellState.alive));
        //console.log("FILLED")
    }

    function randomize() {
        //console.log("RANDOMIZE")
        pause();
        if (grid) setCells(grid.setAll());
        //console.log("RANDOMIZED")
    }

    return (
        <>
            <div>
                <Button label="Randomize" action={() => randomize()} />
                <Button label="Fill" action={() => fill()} />
                <Button label="Clear" action={() => clear()} />

                <div>
                    <ResetButton action={() => reset()} />
                    {isRunning() ? <PauseButton action={() => play()} /> : <PlayButton action={() => play()} />}
                    <NextButton action={() => update()} />
                </div>
            </div>

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
