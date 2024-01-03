import "./styles/PageButton.css";

export default function PageButton({ currentPage, onClick, children, value }) {
  return (
    <button
      value={value}
      onClick={(e) => onClick(e)}
      className={currentPage === value ? "page-button-selected" : "page-button"}
    >
      {children}
    </button>
  );
}
