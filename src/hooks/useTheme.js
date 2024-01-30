import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function(){
  const {isLight, setIsLight} = useContext(ThemeContext);

  function interchangeTheme(){
    setIsLight(prev => !prev);
  }

  return {isLight, interchangeTheme};
}