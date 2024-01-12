import { CellState } from '@/src/logic/logicalHelpers';
import { memo } from 'react';

interface Props {
    state: CellState,
    key: string,
};

export default memo(function Cell(props: Props) {
    return (
        <div className={`grid__cell ${props.state.toString().split('.')[1]}`}>
        </div>
    )
});