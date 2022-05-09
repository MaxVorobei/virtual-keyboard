import {keyboard, dictionary, spec_keys, arrow__keys} from "./constants.js";


let lang = localStorage.getItem("language");
if (!lang) {
   lang = "eng";
   localStorage.setItem("language", "eng");
}

function changeLang (event) {
   if (event.ctrlKey && event.altKey) {
      if (lang == "eng") {
         lang = "ru";
      } else {
         lang = "eng";
      }
      localStorage.setItem("language", lang);
      init();
   }
}




let container = document.createElement("div");
let head = document.createElement("h1");
let text__zone = document.createElement("textarea");
let keybord__zone = document.createElement("div");
let paragraph = document.createElement("p");
container.classList.add("container");
keybord__zone.id = "keyboard";
head.innerText = "My Virt KeyBoard";
paragraph.innerText = "язык переключается сочетанием клавиш ctrl + alt";


container.append(head);
container.append(text__zone);
container.append(keybord__zone);
container.append(paragraph);
document.body.append(container);

let up_or_not = false;
let isShiftOn = false;


function init() {
   let out = "";
   for (let i = 0; i < keyboard.length; i++) {
      if (spec_keys.indexOf(keyboard[i]) != -1) {
      out +=
         "<div class='k-key s-key' id='" + keyboard[i] + "'>" + dictionary[keyboard[i]][lang] + "</div>";
      } else if (arrow__keys.indexOf(keyboard[i]) != -1) {
         out += "<div class='k-key arr-key' id='" + keyboard[i] + "'>" + dictionary[keyboard[i]][lang] + "</div>";
      } else {
      out += "<div class='k-key' id='" + keyboard[i] + "'>" + dictionary[keyboard[i]][lang] + "</div>";
      }

      if (
         keyboard[i] == "Backspace" ||
         keyboard[i] == "Delete" ||
         keyboard[i] == "Enter" ||
         keyboard[i] == "ShiftRight"
      ) {
         out += "<br>";
      }
   }
   document.querySelector("#keyboard").innerHTML = out;
}

function listenShift (event) {
   if (event.shiftKey || isShiftOn) {
      keyboard.forEach(code =>{
         let button = document.getElementById(code);
         if (code.indexOf("Key") !== -1) {
            button.textContent = up_or_not ? button.textContent.toLowerCase() : button.textContent.toUpperCase();
         } else {
            button.textContent = dictionary[code]["shift"] || dictionary[code][lang];
         }
      });

   } else {
      keyboard.forEach(code =>{
         let button = document.getElementById(code);
         if (code.indexOf("Key") !== -1) {
            button.textContent = up_or_not ? button.textContent.toUpperCase() : button.textContent.toLowerCase();
         } else {
            button.textContent = dictionary[code][lang];
         }
      });
   }
}

function listenCaps (code) {
   if (up_or_not) {
      keyboard.forEach(code => {
         let button = document.getElementById(code);
         if (code.indexOf("Key") !== -1) {
            button.textContent = isShiftOn ? button.textContent.toLowerCase() : button.textContent.toUpperCase();
         } else {
            button.textContent = dictionary[code][lang];
         }
      });
   } else {
      keyboard.forEach(code => {
         let button = document.getElementById(code);
         if (code.indexOf("Key") !== -1) {
            button.textContent = isShiftOn ? button.textContent.toUpperCase() : button.textContent.toLowerCase();
         } else {
            button.textContent = dictionary[code][lang];
         }
      });
   }
}



init();

document.onkeydown = function (event) {
   event.preventDefault();
   changeLang(event);
   text__zone.selectionDirection = text__zone.value.length;
   text__zone.focus();
   document.getElementById(event.code).classList.add("active");
   spec__symbol(event.code);
   listenCaps(event.code);
   listenShift(event);
   if (event.altKey || event.ctrlKey || event.code === "ControlLeft") {
      document.getElementById(event.code).classList.add("itPress");
   }
};
document.onkeyup = function (event) {
   document.querySelectorAll("#keyboard .k-key").forEach(function (el) {
      el.classList.remove("active");
   });

   text__zone.selectionStart = text__zone.value.length;
   if (event.code == "ShiftLeft" || event.code == "ShiftRight") {
      isShiftOn = false;
      document.getElementById(event.code).classList.remove("itPress");
      listenShift(event);
   }

};


document.querySelectorAll("#keyboard .k-key").forEach(function (el) {
   el.onmousedown = function (event) {
      text__zone.selectionStart = text__zone.value.length;
      text__zone.focus();
      this.classList.add("active");
      let ev__id = event.target.id;
      spec__symbol(ev__id);
      listenCaps(ev__id);
      listenShift(ev__id);
   };

   el.onmouseup = function (event) {
      text__zone.selectionStart = text__zone.value.length;
      text__zone.focus();
      let ev__id = event.target.id;
      document.querySelectorAll("#keyboard .k-key").forEach(function (el) {
         el.classList.remove("active");
      });
      isShiftOn = false;
      listenShift(ev__id);
   };
});


function spec__symbol (code) {

   switch (code) {

      case "Delete":
      case "Backspace": {
         text__zone.textContent = text__zone.textContent.slice(0, -1);
         break;
      }
      case "Tab": {
         text__zone.textContent += "\t";
         break;
      }

      case "CapsLock": {
         up_or_not = !up_or_not;
         if (up_or_not) {
            document.getElementById("CapsLock").classList.add("itPress");
         } else {
            document.getElementById("CapsLock").classList.remove("itPress");
         }

         break;

      }
      case "Enter": {
         text__zone.textContent += "\n";
         break;
      }

      case "ShiftLeft":
      case "ShiftRight": {
         isShiftOn = true;
         if (isShiftOn) {
            document.getElementById(code).classList.add("itPress");
         } else {
            document.getElementById(code).classList.remove("itPress");
         }
         break;
      }


      case "Space": {
         text__zone.textContent += " ";
         break;
      };

      case "ControlLeft":
      case "MetaLeft":
      case "AltLeft":
      case "AltRight":
      case "ControlRight": {
         break;
      }

      default: {
         let nextSymbol = dictionary[code][lang];
         if (isShiftOn || up_or_not) {
            if (isShiftOn) {
               nextSymbol = dictionary[code]["shift"] || nextSymbol;
            }
            nextSymbol = nextSymbol.toUpperCase();
         }
         text__zone.textContent += nextSymbol;
      }
   }
}