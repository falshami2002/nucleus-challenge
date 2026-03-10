
type DisplayProps = {
    value: string;
}

const Display = (props: DisplayProps) => {
    return (
        <div className="bg-gray-800 text-white p-4 rounded h-12 flex items-center">
            <div>{props.value}</div>
        </div>
    );
}

export default Display;