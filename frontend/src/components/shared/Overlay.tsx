interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  children?: React.ReactChildren;
}
export function Overlay({ onClick, children }: Props) {
  return (
    <div className="overlay" onClick={onClick}>
      {children}
    </div>
  );
}
