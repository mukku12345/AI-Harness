import React, { useEffect, useState } from "react";

function DotPrinter() {
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

    <button type="button"  >{dots}</button>// Render the component only when loading is true
    //  <h1 className="dot-loading" >{dots}</h1> 
  )
}

export default DotPrinter;
