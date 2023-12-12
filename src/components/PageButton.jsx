export default function PageButton({ currentPage, onClick, children, value}) {
  return (
    <button
      value={value}
      onClick={(e) => onClick(e)}
      style={
        currentPage === value
          ? { backgroundColor: "yellowgreen" }
          : { backgroundColor: "white" }
      }
    >
      {children}
    </button>
  );
}
