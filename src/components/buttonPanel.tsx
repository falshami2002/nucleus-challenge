import Button from "./button";

type ButtonPanelProps = {
    onClick: (text: string) => void;
}

const buttons = ["1", "2", "3", "/", "4", "5", "6", "*", "7", "8", "9", "-", "0", ".", "=", "+", "**", "(", ")", "C"];

const ButtonPanel = (props: ButtonPanelProps) => {
  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-4 mt-4">
      {buttons.map((buttonText, index) => (
        <Button key={index} text={buttonText} onClick={() => props.onClick(buttonText)} />
      ))}
    </div>
  )
}

export default ButtonPanel;