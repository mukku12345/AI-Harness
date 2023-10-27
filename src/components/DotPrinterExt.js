import React, { useEffect, useState } from "react";

function DotPrinterExt() {
  const [dots, setDots] = useState("");
  const maxDots = 3;
  const dotCharacter = ".";

  useEffect(() => {
 
      const printDots = () => {
        if (dots.length < maxDots) {
          setDots((prevDots) => prevDots + dotCharacter);
        } else {
          setDots("");
        }
      };

      console.log("Logging for not");
      const intervalId = setInterval(printDots, 300);

      // Clean up the interval when the component unmounts or when loading becomes false
      return () => {
        clearInterval(intervalId);
      };
    
  }, [ dots, maxDots]);

  return(

    // <button type="button" >{dots}</button>// Render the component only when loading is true
    <input type="text"  value={dots} style={{ width: "100%", boxSizing: "border-box", padding: "5px", textAlign: "center", background: "#1451a3", color: "#fff", border: "none", outline: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "600", fontFamily: "Inter, Arial, Helvetica, sans-serif" }} />

  )
}

export default DotPrinterExt;
