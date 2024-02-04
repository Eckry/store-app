import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function(){
  const {isLight, setIsLight} = useContext(ThemeContext);

  function interchangeTheme(){
    localStorage.setItem("theme", JSON.stringify(!isLight));
    setIsLight(prev => !prev);
  }

  return {isLight, interchangeTheme};
}