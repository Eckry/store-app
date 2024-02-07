import "./styles/ImageLoading.css";

export default function ImageLoading({ isLoading }) {
  return (
    <div
      style={{ display: isLoading ? "block" : "none" }}
      className="image-loading"
    ></div>
  );
}
