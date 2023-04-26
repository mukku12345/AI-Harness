

const inputs = document.querySelectorAll('input[type="text"], input[type="password"], textarea,input[type="email"]');
inputs.forEach(input => {
  const icon = document.createElement('img');
  icon.src = 'https://picsum.photos/200';
  icon.style.width = '16px';
  icon.style.height = '16px';
  icon.style.position = 'absolute';
  icon.style.top = '50%';
  icon.style.right = '10px';
  icon.style.transform = 'translateY(-50%)';
  icon.addEventListener('click', () => {
    console.log("clicked")
    const inputPosition = input.getBoundingClientRect();
        const windowX = window.screenX;
        const windowY = window.screenY;
        const x = windowX + inputPosition.left + inputPosition.width ;
        const y = windowY + inputPosition.top + 100;    
        console.log(x);
        console.log("top",y)
        // window.open('https://loving-jemison.62-151-180-40.plesk.page/', '', `left=${x}, top=${y}, width=300, height=200`);
        chrome.runtime.sendMessage({ action: "openMetamask" });
 
      });
  input.parentNode.appendChild(icon);
});









// //   var inputElement = document.getElementById("input");
// //   inputElement.addEventListener("click", function() {
// //     chrome.runtime.sendMessage({type: "open_extension", extensionName: "GPT-3 ask"});
// //   });


// const inputs = document.getElementsByTagName("input");

// for (let i = 0; i < inputs.length; i++) {
//   const input = inputs[i];

//   const icon = document.createElement("i");
//   icon.classList.add("material-icons");
//   icon.textContent = "search";
// //   icon.addEventListener("click",onInputFocus);

//   const wrapper = document.createElement("div");
//   wrapper.classList.add("input-wrapper");
//   wrapper.appendChild(input.cloneNode());
//   wrapper.appendChild(icon);

//   input.replaceWith(wrapper);
// }




