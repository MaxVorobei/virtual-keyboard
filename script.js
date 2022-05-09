const keyboard = [
"Backquote",
"Digit1",
"Digit2",
"Digit3",
"Digit4",
"Digit5",
"Digit6",
"Digit7",
"Digit8",
"Digit9",
"Digit0",
"Minus",
"Equal",
"Backspace",
"Tab",
"KeyQ",
"KeyW",
"KeyE",
"KeyR",
"KeyT",
"KeyY",
"KeyU",
"KeyI",
"KeyO",
"KeyP",
"BracketLeft",
"BracketRight",
"Backslash",
"Delete",
"CapsLock",
"KeyA",
"KeyS",
"KeyD",
"KeyF",
"KeyG",
"KeyH",
"KeyJ",
"KeyK",
"KeyL",
"Semicolon",
"Quote",
"Enter",
"ShiftLeft",
"KeyZ",
"KeyX",
"KeyC",
"KeyV",
"KeyB",
"KeyN",
"KeyM",
"Comma",
"Period",
"Slash",
"ArrowUp",
"ShiftRight",
"ControlLeft",
"MetaLeft",
"AltLeft",
"Space",
"AltRight",
"ControlRight",
"ArrowLeft",
"ArrowDown",
"ArrowRight"
];


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





const dictionary = {
Backquote: { eng: "`", ru: "ё", shift: "~"},
Digit1: { eng: "1", ru: "1", shift: "!"},
Digit2: { eng: "2", ru: "2", shift: "@"},
Digit3: { eng: "3", ru: "3", shift: "#"},
Digit4: { eng: "4", ru: "4", shift: "$"},
Digit5: { eng: "5", ru: "5", shift: "%"},
Digit6: { eng: "6", ru: "6", shift: "^"},
Digit7: { eng: "7", ru: "7", shift: "&"},
Digit8: { eng: "8", ru: "8", shift: "*"},
Digit9: { eng: "9", ru: "9", shift: "("},
Digit0: { eng: "0", ru: "0", shift: ")"},
Minus: { eng: "-", ru: "-", shift: "_"},
Equal: { eng: "=", ru: "=", shift: "+"},
Backspace: { eng: "←", ru: "←" },

Tab: { eng: "Tab", ru: "Tab" },
KeyQ: { eng: "q", ru: "й" },
KeyW: { eng: "w", ru: "ц" },
KeyE: { eng: "e", ru: "у" },
KeyR: { eng: "r", ru: "к" },
KeyT: { eng: "t", ru: "е" },
KeyY: { eng: "y", ru: "н" },
KeyU: { eng: "u", ru: "г" },
KeyI: { eng: "i", ru: "ш" },
KeyO: { eng: "o", ru: "щ" },
KeyP: { eng: "p", ru: "з" },
BracketLeft: { eng: "[", ru: "х", shift: "{"},
BracketRight: { eng: "]", ru: "ъ", shift: "}"},
Backslash: {eng: "\\", ru: "\\", shift: "|"},
Delete: { eng: "Del", ru: "Del" },

CapsLock: { eng: "CapsLook", ru: "CapsLook" },
KeyA: { eng: "a", ru: "ф" },
KeyS: { eng: "s", ru: "ы" },
KeyD: { eng: "d", ru: "в" },
KeyF: { eng: "f", ru: "а" },
KeyG: { eng: "g", ru: "п" },
KeyH: { eng: "h", ru: "р" },
KeyJ: { eng: "j", ru: "о" },
KeyK: { eng: "k", ru: "л" },
KeyL: { eng: "l", ru: "д" },
Semicolon: { eng: ";", ru: "ж", shift: ":"},
Quote: { eng: "'", ru: "э", shift: "\""},
Enter: { eng: "Enter", ru: "Enter" },

ShiftLeft: { eng: "LShift", ru: "LShift" },
KeyZ: { eng: "z", ru: "я" },
KeyX: { eng: "x", ru: "ч" },
KeyC: { eng: "c", ru: "с" },
KeyV: { eng: "v", ru: "м" },
KeyB: { eng: "b", ru: "и" },
KeyN: { eng: "n", ru: "т" },
KeyM: { eng: "m", ru: "ь" },
Comma: { eng: ",", ru: "б", shift: "<"},
Period: { eng: ".", ru: ".", shift: ">"},
Slash: { eng: "/", ru: ".", shift: "?"},
ArrowUp: { eng: "↑", ru: "↑" },
ShiftRight: { eng: "RShift", ru: "Rshift" },

ControlLeft: { eng: "CTRL", ru: "CTRL" },
MetaLeft: { eng: "Win", ru: "Win" },
AltLeft: { eng: "Alt", ru: "Alt" },
Space: { eng: "_____", ru: "_____" },
AltRight: { eng: "Alt", ru: "Alt" },
ArrowLeft: { eng: "←", ru: "←" },
ArrowDown: { eng: "↓", ru: "↓" },
ArrowRight: { eng: "→", ru: "→" },
ControlRight: { eng: "CTRL", ru: "CTRL" },
};

const spec_keys = [
"Backquote",
"Backspace",
"Tab",
"Delete",
"CapsLock",
"Enter",
"ShiftLeft",
"ShiftRight",
"ControlLeft",
"MetaLeft",
"AltLeft",
"Space",
"AltRight",
"ControlRight",
];

const digits = [
   "Backquote",
   "Digit1",
   "Digit2",
   "Digit3",
   "Digit4",
   "Digit5",
   "Digit6",
   "Digit7",
   "Digit9",
   "Digit8",
   "Digit0"
];


const arrow__keys = ["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp"];

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