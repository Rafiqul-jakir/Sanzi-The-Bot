const startBtn = document.getElementById("startBtn");
const result = document.getElementById("result");
const processing = document.getElementById("processing");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let toggleBtn = null;

if (typeof SpeechRecognition === "undefined") {
  startBtn.remove();
  result.innerHTML = "Your browser doesn't support Speech API.Please download latest Chrome version.";
}
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.onresult = event => {
    const current = event.resultIndex;
    const recognitionResult = event.results[current];
    const recognitionText = recognitionResult[0].transcript;

    if (recognitionResult.isFinal) {processing.innerHTML = "processing ...";
      const response = process(recognitionText);
      const p = document.createElement("p");
      p.innerHTML = `<strong>You said:</strong> ${recognitionText}</br><strong>sanzi said:</strong> ${response}`;
      processing.innerHTML = "";
      result.appendChild(p);
      
      readOutLoud(response);
    } else {processing.innerHTML = `listening: ${recognitionText}`;
    }
  };
  let listening = false;
  
  toggleBtn = () => {
    if (listening) {
      recognition.stop();
      startBtn.textContent = "Start listening";
    } else {      recognition.start();
      startBtn.textContent = "Stop listening";
    }
    listening = !listening;
  };
  
  startBtn.addEventListener("click", toggleBtn);
  function process(rawText) {
    let text = rawText.replace(/\s/g, "").replace(/\'/g, "");
    text = text.toLowerCase();
    let response = null;
    if (text.includes("hey")) {
      response = "hi boss";
    }else if (text.includes("hi")) {
        response = "hi boss";
    }else if (text.includes("hello.")) {
          response = "hi boss";
    }else if (text.includes("yourname.")) {
      response = "My name's sanzi.";
    } else if (text.includes("howareyou")||text.includes("whatsup")) {
      response = "I'm fine.";
    } else if (text.includes("whattimeisit")) {
      response = new Date().toLocaleTimeString();
    } else if (text.includes("joke")) {
      response = getRandomItemFromArray(joke);
    } else if (text.includes("flip") && text.includes("coin")) {
      response = Math.random() < 0.5 ? 'heads' : 'tails';
    } else if (text.includes("bye") || text.includes("stop")) {
      response = "Bye!!";
      toggleBtn();
    }else if (text.includes("dance")) {
      response = "NOT NOW";
    }
    else if (text.includes("whoareyou")) {
      response = "i am SANZI the ai bot, developing me by HALUM R&D LIMITED. just say halum the great ";
    }
    else if (text.includes("die")) {
      response = "seriously!";
    }
    else if (text.includes("uh")) {
      response = "dont think just say!";
    }
    else if (text.includes("good")) {
      response = "hmmm ok.";
    }
    else if (text.includes("thankyou")) {
      response = "you are welcome";
    }
    else if (text.includes("turnright")) {
      response = "ok right";
      const Http = new XMLHttpRequest();
      const url='http://192.168.0.113/car?sanzi=7';
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      }
      toggleBtn();
    }
    else if (text.includes("turnleft")) {
      response = "ok left";
      const Http = new XMLHttpRequest();
      const url='http://192.168.0.113/car?sanzi=3';
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      }
      toggleBtn();
    }
    else if (text.includes("moveforward")) {
      response = "OK";
      response = "going forward";
      const Http = new XMLHttpRequest();
      const url='http://192.168.0.113/car?sanzi=8';
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      }
      toggleBtn();
    }
    else if (text.includes("moveback")) {
      response = "OK";
      const Http = new XMLHttpRequest();
      const url='http://192.168.0.113/car?sanzi=2';
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      }
      response = "going back";
      toggleBtn();
    }
    else if (text.includes("rotateright")) {
      response = "OK";
      const Http = new XMLHttpRequest();
      const url='http://192.168.0.113/car?sanzi=6';
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      }
      response = "ok right";
      toggleBtn();
    }
    else if (text.includes("rotateleft")) {
      response = "OK";
      const Http = new XMLHttpRequest();
      const url='http://192.168.0.113/car?sanzi=4';
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      }
      response = "ok left";
      toggleBtn();
    }
    else if (text.includes("stop")) {
      response = "ok";
      const Http = new XMLHttpRequest();
      const url='http://192.168.0.113/car?sanzi=5';
      Http.open("GET", url);
      Http.send();

      Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      }
      toggleBtn();
    }
    else if (text.includes("randommove")) {
      const Http = new XMLHttpRequest();
      const url='http://192.168.0.113/car?sanzi=1';
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      }
      response = "going back";
      toggleBtn();
    }
    // car command end
    //home auto mation command started
    else if (text.includes("turnonalllight")) {
      response = "ok boss";
      const Http = new XMLHttpRequest();
const url='http://192.168.0.132/homeautomaton?home=1';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
  console.log(Http.responseText)
}
    }
    
    else if (text.includes("turnoffalllight")) {

      const Http = new XMLHttpRequest();
      const url='http://192.168.0.132/homeautomaton?home=2';
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      }
      response = "All lights off";
    }
    else if (text.includes("turnonthedininglight")) {
      const Http = new XMLHttpRequest();
      const url='http://192.168.0.132/homeautomaton?home=7';
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      }
      response = "Dining light on";
    }
    else if (text.includes("turnonthebedroomlight")) {
      const Http = new XMLHttpRequest();
      const url='http://192.168.0.132/homeautomaton?home=3';
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      }
      response = "Bed room light on";
    }
    else if (text.includes("turnoffthebedroomlight")) {
      const Http = new XMLHttpRequest();
      const url='http://192.168.0.132/homeautomaton?home=4';
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      }
      response = "Bed room light off";
    }
    else if (text.includes("turnoffthedininglight")) {
      const Http = new XMLHttpRequest();
      const url='http://192.168.0.132/homeautomaton?home=8';
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      }
      response = "Dining light off";
    }
    else if (text.includes("turnonthebathroomlight")) {
      const Http = new XMLHttpRequest();
      const url='http://192.168.0.132/homeautomaton?home=5';
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      }
      response = "Bath room light on";
    }
    else if (text.includes("turnoffthebathroomlight")) {
      const Http = new XMLHttpRequest();
      const url='http://192.168.0.132/homeautomaton?home=6';
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      }
      response = "Bath room light off";
    }
    else if (text.includes("turnonthetablelight")) {
      const Http = new XMLHttpRequest();
      const url='http://192.168.0.132/homeautomaton?home=9';
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      }
      response = "table light on";
    }
    else if (text.includes("turnoffthetablelight")) {
      const Http = new XMLHttpRequest();
      const url='http://192.168.0.132/homeautomaton?home=10';
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      }
      response = "table light off";
    }
    else if (text.includes("findme")) {
      response = "finding boss";
      const Http = new XMLHttpRequest();
      const url='http://192.168.0.113/car?sanzi=1';
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
      }
      response = "NOT FOUND";
      toggleBtn();
    }
  
    if (!response) {
      response = "data not found ";
      toggleBtn();
      // window.open(`http://google.com/search?q=${rawText.replace("search", "")}`,"_blank");
      // return `I found some information for ${rawText}`;
    }
  
    return response;
  }
  function getRandomItemFromArray(array) {
    const randomItem = array[Math.floor(Math.random() * array.length)];
    return randomItem;
  };
  function readOutLoud(message) {
    const speech = new SpeechSynthesisUtterance();
    
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1.8;
    speech.voice = voices[2];  
    window.speechSynthesis.speak(speech);
  }
// wait on voices to be loaded before fetching list
window.speechSynthesis.onvoiceschanged = function() {
    voices = window.speechSynthesis.getVoices();
};