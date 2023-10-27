//Add custom menu

//Get Current url
var currentUrl=window.location.href
console.log("currentUrl",currentUrl)

// if (/google/.test(window.location.href)) {
//   console.log("It's a Google URL");

//   var myDivgoogle = document.createElement('div');
//   myDivgoogle.id = 'myDivgoogle';
//   myDivgoogle.className = 'myDivClassgoogle';
//   myDivgoogle.style.backgroundColor = '#f5f5f5';
//   myDivgoogle.style.border = '1px solid #ccc';
//   myDivgoogle.style.position = 'absolute';

//   // Calculate the position based on window dimensions and scroll position
//   var divTop = window.innerHeight / 2 + window.scrollY;
//   var divLeft = window.innerWidth / 2 + window.scrollX;

//   myDivgoogle.style.top = divTop + 'px';
//   myDivgoogle.style.left = divLeft + 'px';
//   myDivgoogle.style.height = '-webkit-fill-available';

//   var parentElement = document.body; // replace this with the actual parent element
//   parentElement.appendChild(myDivgoogle);

//   var iframe = document.createElement('iframe');
//   // iframe.src = 'https://loving-jemison.62-151-180-40.plesk.page/';
//     iframe.src = 'https://prompt.aiharness.io/'
//   iframe.style.width = '148%';
//   iframe.style.height = '231%';

//   // const closeButton = document.createElement('button');
//   // closeButton.textContent = 'Close';
//   // closeButton.addEventListener('click', function() {
//   //   myDivgoogle.remove();
//   // });
//   // closeButton.style.position = 'absolute';
//   // closeButton.style.top = '0';
//   // closeButton.style.right = '0';

//   myDivgoogle.appendChild(iframe);
//   // myDivgoogle.appendChild(closeButton);
//   document.body.appendChild(myDivgoogle);

//   document.addEventListener('click', function(event) {
//     if (event.target !== myDivgoogle && !myDivgoogle.contains(event.target)) {
//       myDivgoogle.remove();
//     }
//   });
// }




/////////////////////////////////////////////////////////////////////icon next to input//////////////////////////////////////////////////////////////////////////////////////////////////////


if (document.readyState !== 'loading') {
  console.log('document is already ready, just execute code here');
  initializeIcon();
} else {
  document.addEventListener('DOMContentLoaded', function () {
      console.log('document was not ready, place code here');
      initializeIcon();
  });
}


function initializeIcon(){


const inputs = document.querySelectorAll('input[type="text"],input[type="password"],input[type="email"],input[type="search"],input[type="tel"],input[type="number"],input[type="url"],textarea');

const label = document.querySelectorAll('label');

     console.log("inputs==========>",inputs)
     console.log("inputs length==========>",inputs.length)
     console.log("label===========>",label);
// console.log("window onload before loading =====>",window.onload)


  inputs.forEach(input => {

    if (input.nextElementSibling && input.nextElementSibling.classList.contains('icon')) {
      return;
    }


    const icon = document.createElement('img');
    // const input = document.createElement('input');

    // label.style.display = 'block'
    // inputs.style.display = 'inline-block'

    icon.className = 'icon';
    // icon.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M221.5 51.7C216.6 39.8 204.9 32 192 32s-24.6 7.8-29.5 19.7l-120 288-40 96c-6.8 16.3 .9 35 17.2 41.8s35-.9 41.8-17.2L93.3 384H290.7l31.8 76.3c6.8 16.3 25.5 24 41.8 17.2s24-25.5 17.2-41.8l-40-96-120-288zM264 320H120l72-172.8L264 320z"/></svg>`;
    icon.src = "https://aiharness.io/ai-harness-icon.png"

    if (input.tagName === 'INPUT') {
    icon.style.width = '12px';
    icon.style.height = '12px';
    icon.style.position = 'absolute';
    icon.style.padding = '0px';
    icon.style.minWidth = '5px';

    
    icon.style.right = '7px';
    icon.style.top = '40%';
    // icon.style.transform = 'translateY(-50%)';
    // icon.style.borderRadius = '50%';
    // icon.style.backgroundColor = '#ffffff';
    // icon.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
    // icon.style.transition = 'transform 0.2s, box-shadow 0.2s ';
    icon.style.cursor  = "pointer"
    icon.style.zIndex = '9999';
    }



    // Calculate the vertical position based on the element type
// let verticalPosition = '40%';
if (input.tagName === 'TEXTAREA') {
  // verticalPosition = '50%'; // Adjust as needed


icon.style.width = '12px';
icon.style.height = '12px';
icon.style.position = 'absolute';
icon.style.padding = '0px';
icon.style.minWidth = '5px';
icon.style.right = '7px';
icon.style.top = "40%";
icon.style.cursor = 'pointer';
icon.style.zIndex = '9999';

}
    // input.addEventListener('focus', function() {
    //   icon.style.transform = 'translateY(-50%) scale(1.1)';
    //   icon.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    // });

    // input.addEventListener('blur', function() {
    //   icon.style.transform = 'translateY(-50%)';
    //   icon.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
    // });

var myDiv1 = null;

  icon.addEventListener('click', (e) => {
    e.stopPropagation(); 

console.log("e stoping prop",e.stopPropagation())

    if (myDiv1) {
      myDiv1.style.display = 'none';
      document.removeEventListener('click', handleOutsideClick);
      myDiv1 = null;
   } else {

    myDiv1 = document.createElement('div');
    myDiv1.id = 'myDiv1';
    myDiv1.className = 'myDivClass';
    myDiv1.style.backgroundColor = '#f5f5f5';
    myDiv1.style.border = '1px solid #ccc';
    myDiv1.style.position = 'fixed';
    myDiv1.style.height = 360 + 'px';
    myDiv1.style.width = 300 + 'px';

    myDiv1.style.zIndex = '9999';
    // myDiv1.style.top = y + 28 + 'px';
    // myDiv1.style.left = x + 250+'px';


    console.log("clicked")
    const inputPosition = input.getBoundingClientRect();
    const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const divWidth = 300; // Adjust this value based on the width of your div
const divHeight = 360; //

console.log("input position ==>",inputPosition,"letf=>",inputPosition.left,"right=>",inputPosition.right);
console.log("windowWidth ==>",windowWidth);
console.log("windowHeight ==>",windowHeight);




const availableSpaceRight = windowWidth - (inputPosition.left + inputPosition.width);
// const availableSpaceLeft = windowWidth - (inputPosition.right + inputPosition.width);

console.log("availableSpaceRight",availableSpaceRight)
// Calculate the available space on the bottom side of the icon
const availableSpaceBottom = windowHeight - (inputPosition.top + inputPosition.height);
// const availableSpaceTop = windowHeight - (inputPosition.bottom + inputPosition.height);


    if (availableSpaceRight >= divWidth) {
      myDiv1.style.left = inputPosition.left + inputPosition.width + 10+'px';
    } else {
      // Position the div on the left side of the icon if there's not enough space on the right
      myDiv1.style.left = inputPosition.left - divWidth + 320+'px';
    }
    
    // Check if there's enough space on the bottom to position the div
    if (availableSpaceBottom >= divHeight) {
      myDiv1.style.top = inputPosition.top + 30+'px';
    } else if(availableSpaceBottom < divHeight) {
      // Position the div on the top of the icon if there's not enough space on the bottom
      myDiv1.style.top = inputPosition.top - divHeight + 67+'px';
    }else{
      myDiv1.style.top = inputPosition.top - divHeight +'px';
    }
   
   
   

    



    var parentElement = document.body; // replace this with the actual parent element
    parentElement.appendChild(myDiv1);

    var iframe = document.createElement('iframe');
    
    iframe.src = 'https://prompt.aiharness.io/?q=textinput';

    
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.boxShadow = 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
    iframe.style.border = 'none';
  
    
    // iframe.style.left=x + "px";
    // iframe.style.top=y+"px"
    myDiv1.appendChild(iframe);
    document.body.appendChild(myDiv1);
 
    

    document.addEventListener('click', handleOutsideClick);
    
   }
  });
  input.parentNode.style.position = 'relative';
  input.parentNode.appendChild(icon);
 
  function handleOutsideClick(e) {
    if (!myDiv1.contains(e.target) && e.target !== icon) {
        myDiv1.style.display = 'none';
        document.removeEventListener('click', handleOutsideClick);
        myDiv1 = null;
    }
}                           


});
}

// function handleNavigation() {
//   initializeIcon();
//   console.log("Page navigated, initializeIcon called");
// }

// // Attach the handleNavigation function to the popstate event
// window.addEventListener('popstate', handleNavigation);

function handlePageChange() {
  initializeIcon();
  console.log("Page changed, initializeIcon called");
}

// Attach the handlePageChange function to the window.onchange event
window.onchange = handlePageChange;


// Function to handle navigation clicks through event delegation
// function handleNavigationClick(event) {
//   const target = event.target;
//   const isLink = target.tagName === 'A';
//   const isButton = target.tagName === 'BUTTON';

//   if (isLink || isButton) {
//     // Perform any specific actions before navigation, if needed
//   }
// }

// // Attach the handleNavigationClick function to the common ancestor element
// document.addEventListener('click', handleNavigationClick);



// document.addEventListener('DOMContentLoaded', function() {
//   initializeIcon();
//   console.log(" document eventListener DOM loaded")
// });

// Function to handle the page load event

window.onload =function(){

  initializeIcon();
console.log("window onload after loading",window.onload)

}


















///text selection 

let isDivOpened = false;


document.addEventListener('mouseup', (event) => {
  const selectedText = window.getSelection().toString(); 
  const containsNonWhitespace = /\S/.test(selectedText);
  if (selectedText && !isDivOpened && containsNonWhitespace) {
    isDivOpened = true;
    var myDiv = document.createElement('div');
    myDiv.id = 'myDiv';
    // myDiv.className = 'myDivClass';
    myDiv.style.backgroundColor = '#f5f5f5';
    myDiv.style.border = '1px solid #ccc';
    myDiv.style.position = 'absolute';
    myDiv.style.height = 360 + 'px';
    myDiv.style.width = 300 + 'px';

    myDiv.style.zIndex = '9999';

    var parentElement = document.body; 
    parentElement.appendChild(myDiv);

    var iframe = document.createElement('iframe');
  
    iframe.src = `https://prompt.aiharness.io/?q=textinput&selectedtext=${selectedText}`
    iframe.style.width = '100%';
    iframe.style.height = '100%';
   
    myDiv.appendChild(iframe);
    document.body.appendChild(myDiv);
    // Get the position of the selected text
    var range = window.getSelection().getRangeAt(0);
    var rect = range.getBoundingClientRect();
  
    // Calculate the dimensions of the div and the viewport
    var divWidth = myDiv.offsetWidth;
    var divHeight = myDiv.offsetHeight;
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;
  
    // Calculate the top and left positions of the div
    var topPosition, leftPosition;
  
    // Check if there is enough space to the right
    if (rect.left + divWidth <= viewportWidth) {
      leftPosition = rect.left + window.pageXOffset;
    } else {
      // If not, open the div to the left of the selected text
      leftPosition = rect.left + window.pageXOffset - divWidth;
    }
  
    // Check if there is enough space below
    if (rect.bottom + divHeight <= viewportHeight) {
      topPosition = rect.bottom + window.pageYOffset;
    } else if (rect.top - divHeight >= 0) {
      // If not, check if there's enough space above
      topPosition = rect.top + window.pageYOffset - divHeight;
    } else {
      // If not, open the div below the selected text
      topPosition = rect.bottom + window.pageYOffset;
    }
  
    // Set the position of the div
    myDiv.style.top = topPosition +2+'px';
    myDiv.style.left = leftPosition +'px';
    
  } else if (!selectedText || !containsNonWhitespace && isDivOpened ) {
    isDivOpened = false;
    var myDiv = document.getElementById('myDiv');
    if (myDiv) {
      myDiv.parentNode.removeChild(myDiv);
    }
  }

    // myDiv.style.top = topPosition + 'px';
    // myDiv.style.left = rect.left + window.pageXOffset + 'px';

    // Add the div to the page
  
  document.addEventListener('selectionchange', function () {
    var myDiv = document.getElementById('myDiv');
    if (!window.getSelection().toString().trim() && myDiv) {
      myDiv.parentNode.removeChild(myDiv);
    }
  });
});














//Side Right Icon
// create icon element
var rightDiv = document.createElement('div');

var iconDiv = document.createElement('img');

rightDiv.id = 'my-icon';
iconDiv.id = 'my-icon-image';

rightDiv.appendChild(iconDiv);

// add icon to the right side of the page
 iconDiv.src ='https://aiharness.io/ai-harness-icon.png'
 iconDiv.alt ="ai-harness-icon";

rightDiv.style.position = 'fixed';
rightDiv.style.top = '50%';
rightDiv.style.padding="10px"
rightDiv.style.right = '-1px';
rightDiv.style.transform = 'translateY(-50%)';
rightDiv.style.backgroundColor = 'white';
rightDiv.style.borderRadius='10px 0 0 10px'
rightDiv.style.cursor = 'pointer'
rightDiv.style.zIndex = '9999';
rightDiv.style.boxShadow = '0 0 15px #00000040';
iconDiv.style.height="auto"
iconDiv.style.width="30px"

document.body.appendChild(rightDiv);


// create div and iframe elements
const myDiv2 = document.createElement('div');
myDiv2.className = 'myDivClass2';
myDiv2.id = 'myDivid2';

const myIframe = document.createElement('iframe');

// set attributes for div and iframe
myDiv2.style.position = 'fixed';
myDiv2.style.top = '0%';
myDiv2.style.right = '0';
myDiv2.style.width = '400px';
myDiv2.style.height = '100vh';
myDiv2.style.backgroundColor = 'transparent';
myDiv2.style.border = 'none';
myDiv2.style.zIndex = '9999';
myDiv2.style.display = 'none';

myIframe.src = 'https://prompt.aiharness.io/';
myIframe.style.width = '100%';
myIframe.style.height = '100%';
myIframe.style.border = 'none';
myIframe.style.borderRadius = '20px 0 0 20px';
myIframe.style.boxShadow = '0 0 20px #00000030';

// add click event listener to icon element
iconDiv.addEventListener('click', function () {
  // add iframe to div
  myDiv2.appendChild(myIframe);

  // add div to the right side of the icon
  const iconRect = iconDiv.getBoundingClientRect();
  // myDiv2.style.top = `${iconRect.top}px`;
  // myDiv2.style.left = `${iconRect.left + 10}px`;

  myDiv2.style.display = 'block';

  // add click event listener to hide the div when user clicks outside of it
});

// add div to the page
document.body.appendChild(myDiv2);

window.onclick = e => {
  console.log("event", e)
  console.log("e.target.ariaLabel",e.target.ariaLabel)
  if (!myDiv2.contains(e.target) && e.target !== iconDiv) {
    myDiv2.style.display = 'none';
  }

  if(e.target.ariaLabel=="Message Body"){
    console.log("Its message body")
    var myDivgmail = document.createElement('div');
    myDivgmail.id = 'myDivgmail';
    myDivgmail.className = 'myDivClassgmail';
    myDivgmail.style.backgroundColor = '#f5f5f5';
    myDivgmail.style.border = '1px solid #ccc';
    myDivgmail.style.position = 'absolute';
    myDivgmail.style.top = 80 + 'px';
    myDivgmail.style.left = 215 + 'px';
    myDivgmail.style.display = 'block';

    var parentElement = document.body; // replace this with the actual parent element
    parentElement.appendChild(myDivgmail);

    var iframe = document.createElement('iframe');
    iframe.src = 'https://prompt.aiharness.io/?q=gmail&text=abc ';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    // iframe.style.left=x + "px";
    // iframe.style.top=y+"px"
    myDivgmail.appendChild(iframe);
    // Get the position of the selected text
    // var range = window.getSelection().getRangeAt(0)    

    // myDivgmail.style.top = rect.top + window.pageYOffset + 30 + 'px';
    // myDivgmail.style.left = rect.left + window.pageXOffset + 'px';

    // Add the div to the page
    document.body.appendChild(myDivgmail);
  }
    // if(e.target.ariaLabel===null){
    //   var container2 = document.getElementById('myDivgmail');
    //   container2.style.display = 'none';
    //   container2.parentNode.removeChild(container2)
    
    // }

    // if(e.target){
    //    console.log("inside googlediv")
    //   var container3 = document.getElementById('myDivgoogle');
    //   container3.style.display = 'none';
    //   container3.remove(container3)
    
    // }

    
}

// document.addEventListener('mouseup', function(e) {
//   var container = document.getElementById('myDiv1');

//   if (!container.contains(e.target)) {
//     console.log("display none myDiv1")
//       container.style.display = 'none';
//   }
  
// });

///////////making div moveable //////////////

var mousePosition;
    var offset = [0, 0];
    var isDown = false;
    rightDiv.addEventListener('mousedown', function(e) {
        isDown = true;
        offset = [
            rightDiv.offsetLeft - e.clientX,
            rightDiv.offsetTop - e.clientY
        ];
    }, true);

    document.addEventListener('mouseup', function() {
        isDown = false;
    }, true);

    document.addEventListener('mousemove', function(event) {
        event.preventDefault();
        if (isDown) {
            mousePosition = {
                x: event.clientX,
                y: event.clientY
            };
            var newY = mousePosition.y + offset[1];
            var screenHeight = window.innerHeight;
            var maxTop = screenHeight - rightDiv.offsetHeight;
            newY = Math.min(maxTop, Math.max(0, newY)); 

            rightDiv.style.top = newY + 'px';
        }
    }, true);


