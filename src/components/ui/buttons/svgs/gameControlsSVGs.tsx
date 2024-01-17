const SIZE = '1.5rem';
const COLOR = '#FFF';

const SVGNext = () => (
    <svg fill={COLOR} width={SIZE} height={SIZE} viewBox="0 0 22 22"
        xmlns="http://www.w3.org/2000/svg" id="memory-chevron-right">
        <path d="M10 6V5H9V4H7V6H8V7H9V8H10V9H11V10H12V12H11V13H10V14H9V15H8V16H7V18H9V17H10V16H11V15H12V14H13V13H14V12H15V10H14V9H13V8H12V7H11V6" />
    </svg>
);

const SVGPrevious = () => (
    <svg fill={COLOR} width={SIZE} height={SIZE} viewBox="0 0 22 22"
        xmlns="http://www.w3.org/2000/svg" id="memory-chevron-left" >
        <path d="M12 16V17H13V18H15V16H14V15H13V14H12V13H11V12H10V10H11V9H12V8H13V7H14V6H15V4H13V5H12V6H11V7H10V8H9V9H8V10H7V12H8V13H9V14H10V15H11V16" />
    </svg>
);

const SVGPlay = () => (
    <svg fill={COLOR} width={SIZE} height={SIZE} viewBox="0 0 22 22"
        xmlns="http://www.w3.org/2000/svg" id="memory-play">
        <path d="M10 5V6H11V7H12V8H13V9H14V10H15V12H14V13H13V14H12V15H11V16H10V17H9V18H7V4H9V5H10M12 10H11V9H10V8H9V14H10V13H11V12H12V10Z" />
    </svg>
);

const SVGPause = () => (
    <svg fill={COLOR} width={SIZE} height={SIZE} viewBox="0 0 22 22"
        xmlns="http://www.w3.org/2000/svg" id="memory-pause">
        <path d="M6 4H9V18H6V4M13 18V4H16V18H13Z" />
    </svg>
);

const SVGReset = () => (
    <svg fill={COLOR} width={SIZE} height={SIZE} viewBox="0 0 22 22"
        xmlns="http://www.w3.org/2000/svg" id="memory-rotate-counterclockwise">
        <path d="M0 11V12H1V13H2V14H3V15H5V14H6V13H7V12H8V11H5V9H6V7H7V6H9V5H13V6H15V7H16V9H17V13H16V15H15V16H13V17H9V16H6V18H8V19H14V18H16V17H17V16H18V14H19V8H18V6H17V5H16V4H14V3H8V4H6V5H5V6H4V8H3V11H0Z" />
    </svg>
);

export { SVGNext, SVGPause, SVGPlay, SVGPrevious, SVGReset };