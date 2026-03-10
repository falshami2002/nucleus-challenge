
type buttonProps = {
    text: string;
    onClick: (text: string) => void;
}

const Button = (buttonProps: buttonProps) => {
    return (
        <button className="shadow-md" onClick={() => buttonProps.onClick(buttonProps.text)}>
            {buttonProps.text}
        </button>
    )
}

export default Button;