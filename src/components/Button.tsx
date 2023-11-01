export default function Button({ style, value, onClick }) {
  return (
    <button className={style} onClick={onClick}>
      {value}
    </button>
  );
}
