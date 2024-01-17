interface Props {
    label: string,
    action: Function,
}

export default function Button(props: Props) {
    return (
        <button
            className="btn"
            onClick={(e) => props.action()}
        >
            {props.label}
        </button>
    );

}