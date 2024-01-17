import Image from "next/image"
import { SVGPlay, SVGPause, SVGNext, SVGReset } from "./svgs/gameControlsSVGs";
import { ReactNode } from "react";

interface ActionIconButtonProps {
    action: Function,
}

function PlayButton(props: ActionIconButtonProps) {
    return (
        <IconButton
            action={props.action}
            label='Play'
            icon={<SVGPlay />}
        />
    )
};

function PauseButton(props: ActionIconButtonProps) {
    return (
        <IconButton
            action={props.action}
            label='Pause'
            icon={<SVGPause />}
        />
    )
};

function NextButton(props: ActionIconButtonProps) {
    return (
        <IconButton
            action={props.action}
            label='Next'
            icon={<SVGNext />}
        />
    )
}

function ResetButton(props: ActionIconButtonProps) {
    const { action } = props;
    return (
        <IconButton
            action={action}
            label='Reset'
            icon={<SVGReset />}
        />
    )
}


interface IconButtonProps {
    label: string,
    action: Function,
    icon: React.JSX.Element,
}


function IconButton(props: IconButtonProps) {
    return (
        <button
            className="btn icon"
            onClick={(e) => props.action()}
        >
            {props.icon}
        </button>
    );

}

export { PlayButton, PauseButton, NextButton, ResetButton };