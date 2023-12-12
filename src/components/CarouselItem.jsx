import "./styles/CarouselItem.css";

export default function CarouselItem({ children, currentPage }) {
  return (
    <div
      className="grid"
      style={{ transform: `translate(-${currentPage * 103.3}%)` }}
    >
      {children}
    </div>
  );
}
