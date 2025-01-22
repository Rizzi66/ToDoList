import "./Button.scss";

export default function Button({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) {
  return (
    <button type="button" className="button" onClick={onClick}>
      <span>{text}</span>
    </button>
  );
}
