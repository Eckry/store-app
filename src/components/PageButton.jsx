import "./styles/PageButton.css";

export default function PageButton({
  currentPage,
  setCurrentPage,
  children,
  value,
}) {
  function handleClick(e) {
    const newPage = parseInt(e.target.value)
    if (value === "prev") return setCurrentPage(currentPage - 1);
    if (value === "next") return setCurrentPage(currentPage + 1);
    setCurrentPage(newPage);
  }

  return (
    <button
      value={value}
      onClick={handleClick}
      className={currentPage === value ? "page-button-selected" : "page-button"}
    >
      {children}
    </button>
  );
}
