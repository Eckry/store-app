import "./styles/Pending.css";
import { FaRegFaceSadCry } from "react-icons/fa6";

export default function Pending({ isLoading, error }) {
  if (error)
    return (
      <>
        <FaRegFaceSadCry className="pending-face" />
        <p className="pending-error">Something went wrong...</p>
      </>
    );
  if (isLoading)
    return (
      <span className="loading">
        <span className="circle"></span>
        <span className="circle"></span>
        <span className="circle"></span>
        <span className="circle"></span>
        <span className="circle"></span>
      </span>
    );
  return;
}
