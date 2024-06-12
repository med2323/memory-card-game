const cards = document.querySelectorAll(".card");
const iterationsElement = document.getElementById("iterations");
const timerElement = document.getElementById("timer");
const congratulationsElement = document.querySelector(".congratulations");
const finalTimeElement = document.getElementById("final-time");
const finalIterationsElement = document.getElementById("final-iterations");
const playAgainButton = document.getElementById("play-again");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let iterations = 0;
let startTime, timerInterval;

function flipCard({target: clickedCard}) {
    if (!startTime) {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1000);
    }

    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        iterations++;
        iterationsElement.textContent = `Iterations: ${iterations}`;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched === 8) {
            clearInterval(timerInterval);
            setTimeout(() => {
                showCongratulations();
            }, 500);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    iterations = 0;
    iterationsElement.textContent = `Iterations: 0`;
    clearInterval(timerInterval);
    timerElement.textContent = `Time: 0:00`;
    startTime = null;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

function updateTimer() {
    if (startTime) {
        const elapsedTime = Math.floor((new Date() - startTime) / 1000);
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        timerElement.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}

function showCongratulations() {
    finalTimeElement.textContent = timerElement.textContent.split(" ")[1];
    finalIterationsElement.textContent = iterations;
    congratulationsElement.style.display = "block";
}

playAgainButton.addEventListener("click", () => {
    congratulationsElement.style.display = "none";
    shuffleCard();
});

shuffleCard();
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
