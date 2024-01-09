import { Cell_ } from '@/src/grid';

interface Props {
    data: Cell_;
  }

export default function Cell(props : Props){

    const data = props.data;

    return (
        <div className={`grid__cell ${data.isAlive() ? 'alive' : 'dead'}`}></div>
    )
}