"use strict";

// VARIABLES

let cards ;
let cardsList = [
  "assets/bg-image/animal1.jpg",
  "assets/bg-image/animal2.jpg",
  "assets/bg-image/animal3.jpg",
  "assets/bg-image/animal4.jpg",
  "assets/bg-image/animal5.jpg",
  "assets/bg-image/animal6.jpg",
  "assets/bg-image/animal7.jpg",
  "assets/bg-image/animal8.jpg",
  "assets/bg-image/animal9.jpg",
  "assets/bg-image/animal10.jpg",
  "assets/bg-image/animal11.jpg",
  "assets/bg-image/animal12.jpg",
  "assets/bg-image/animal13.jpg",
];
let cardsContainer = document.querySelector(".memory-container");
let memoryPairs = document.querySelector('.memory-pairs');
let imageList = [];
let imgBack = "";
let imgFront = "";
let hiddenClass = "visually-hidden";
let yourTimeElement = document.querySelector('.your-time-minute');
let yourSecondElement = document.querySelector('.your-time-second');
let minuteElement = document.querySelector('.time-minute');
let secondElement = document.querySelector('.time-second');
let startContainer = document.querySelector('.start-container');
let pageMain = document.querySelector('main');
let winContainer = document.querySelector('.win-container')
let minute = 0;
let sec = 0;
let interval;
let localBestTimeMin = localStorage.getItem('best time minute')
let localBestTimeSec =  localStorage.getItem('best time sec')
let bestTime = document.querySelector('.best-time-min-sec');
let numberPairs = Array.from(document.querySelectorAll('.pairs-number'));
console.log(imageList);


// FUNCTIONS

pageMain.classList.add(hiddenClass);
winContainer.classList.add(hiddenClass)


const shuffle = (array) => {
  let j, temp;

  for (let i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

imageList = shuffle(imageList);
console.log(imageList);

const createElement = (el, className, parent, info, hidden) => {
  let neu = document.createElement(el);
  neu.classList.add(className);
  parent.append(neu);
  if (info) {
    neu.src = info;
  }
  if (hidden) {
    neu.classList.add(hidden);
  }

  return neu;
};

const createCards = (num) => {
  // debugger
  for (let i = 1; i <= num; i++) {
    let card = createElement("div", "memory-card", cardsContainer);
    card.dataset.index = i;
    let imgBack = createElement(
      "img",
      "back-card",
      card,
      `assets/bg-image/bg-img1.jpg`
    );
    let imgFront = createElement(
      "img",
      "front-card",
      card,
      imageList[i - 1],
      hiddenClass
    );
  }
};





const startTimer = () => {
  sec++
  if (sec <= 9) {
    secondElement.innerText = "0" + sec + 's ';
  } else {
    secondElement.innerText = sec + 's ';
  }
  if (sec >59) {
    minute++
    if(minute <= 9){
      minuteElement.innerText = '0' + minute + 'm';
    }
    else{
      minuteElement.innerText = minute + 'm';
    }
    sec = 0;
    secondElement.innerText = '0' + sec + 's ';
  }
}




const compareTime = () => {
  if (minute< localBestTimeMin) {
    localStorage.setItem('best time minute' , minute );
  localStorage.setItem('best time sec', sec)
  bestTime.innerHTML = minute + 'm ' + sec + 's';
  } else if (minute == localBestTimeMin && sec < localBestTimeSec){
    localStorage.setItem('best time minute' , minute );
    localStorage.setItem('best time sec', sec);
    bestTime.innerHTML = minute + 'm ' + sec + 's'
  } else {
    bestTime.innerHTML = localBestTimeMin + 'm ' + localBestTimeSec + 's'
  }
}

const memLocal = () => {
  console.log(cards);
  if (num === cards/2) {
    pageMain.classList.add(hiddenClass)
    winContainer.classList.remove(hiddenClass);
    yourTimeElement.innerHTML = minute + 'm ';
    yourSecondElement.innerHTML = sec + ' s';
    compareTime()
  }
}

const makepairs = (backs, fronts) => {
  if (clickEl.length == 2) {
    window.setTimeout(() => {
      if (clickEl[0].src !== clickEl[1].src) {
        for (let i = 0; i < index.length; i++) {
          backs[index[i] - 1].classList.remove(hiddenClass);
          fronts[index[i] - 1].classList.add(hiddenClass);
        }
      } else {
        for (let i = 0; i < index.length; i++) {
          fronts[index[i] - 1].classList.add(hiddenClass);
        }
        num ++;
        memoryPairs.innerText = num;
        memLocal();
      }
      clickEl = [];
        index = []
    }, 1000);
  }
}





// EVENT LISTENERS
let clickEl = [];
let back = "";
let front = "";
let index = [];
let num = 0;


const addClick = (cards, backs, fronts) => {
  for (let card of cards) {
    memoryPairs.innerText = num;
      card.addEventListener("click", () => {

        let back = card.querySelector(".back-card");
        let front = card.querySelector(".front-card");
        clickEl.push(front);
        index.push(card.dataset.index);
        back.classList.add(hiddenClass);
        front.classList.remove(hiddenClass);

        makepairs(backs, fronts);
      });
    }
}


const start = () => {
  for(let pairNumber of numberPairs) {
    pairNumber.addEventListener('click' , (evt)=> {
      evt.preventDefault();
      cards =evt.target.innerHTML;
      for (let i = 0; i < cards / 2; i++) {
        for (let j = 0; j < 2; j++) {
          imageList.push(cardsList[i]);
        }
      }

      imageList = shuffle(imageList);

      createCards(cards);
      let memoryCards = Array.from(document.querySelectorAll(".memory-card"));
      let backs = Array.from(document.querySelectorAll(".back-card"));
      let fronts = Array.from(document.querySelectorAll(".front-card"));

      addClick(memoryCards, backs, fronts)

      startContainer.classList.add(hiddenClass);
      pageMain.classList.remove(hiddenClass);
      clearInterval(interval);
      interval = setInterval(startTimer, 1000)
  })}
}



const init =()=> {
  start()
}

init()




