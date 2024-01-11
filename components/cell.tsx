import LogicalCell from '@/src/logicalCell';
import { CellState } from '@/src/logicalHelpers';
import { Component, JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, forwardRef, useImperativeHandle, useState } from 'react';

interface Props {
    data: LogicalCell;
};

interface State {
    cellState: CellState;
    n : number;
};

export default class Cell extends Component<Props, State> {
    data = this.props.data;

    state: State = {
        cellState: this.data.getState(),
        n: this.data.computeAliveNeighborsNumber(),
    }

    update = () => {
        console.log("Changing");
        this.setState(() => ({
            cellState: this.data.getState(),
            n : this.data.computeAliveNeighborsNumber()
        }));
    }

    render() {
        return (
            <div className={`grid__cell ${this.data.isAlive() ? 'alive' : 'dead'}`}>
                { this.state.n }
            </div>
        )
    }
}