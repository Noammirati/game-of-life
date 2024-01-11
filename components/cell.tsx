import LogicalCell from '@/src/logicalCell';
import { CellState } from '@/src/logicalHelpers';
import { Component, JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, forwardRef, useImperativeHandle, useState } from 'react';

interface Props {
    data: LogicalCell;
};

interface State {
    cellState: CellState; // like this
};

export default class Cell extends Component<Props, State> {
    data = this.props.data;

    state: State = {
        cellState: this.data.getState(),
    }

    update = () => {
        console.log("Changing");
        this.setState(() => ({
            cellState: this.data.getState()
        }));
    }

    render() {
        return (
            <div className={`grid__cell ${this.data.isAlive() ? 'alive' : 'dead'}`}>
            </div>
        )
    }
}
// const Cell = forwardRef((props, ref) => {
//     //const data = props;
//     const [cellState, setCellState] = useState<any>(CellState.alive);

//     useImperativeHandle(ref, () => ({
//         functionOfChildComponent: () => {
//             setCellState(CellState.dead);
//         }
//     }));

//     return <CellDisplay color="green" />
// });

// Cell.displayName = 'Cell';

// interface Props {
//     color: string;
// }

// function CellDisplay(props: Props) {

//     const functionOfChildComponent = () => { console.log("BITE") }

//     return (
//         <div>{props.color}</div>
//     )
// }

// export { Cell, CellDisplay };




// export default function Cell = forwardRef<Cell, Props>((props: Props, ref : ForwardedRef<Cell>) {
//     const data = props.data;
//     const [state, setState] = useState(data.getState());

//     useImperativeHandle(ref, ()=>({
//         functionToBeCalled: () => setState(CellState.alive),
//     }));
// )

//     return (
//
//     )
// })