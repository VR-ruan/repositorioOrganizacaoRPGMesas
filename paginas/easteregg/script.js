const cards = document.querySelectorAll(".card");

let cardUm, cardDois;
let disabilitarClick = false;
let matched = 0;

function flipCard(e) {
  let clickedCard = e.target; // colocando a carta clickada na vaiável

  if (clickedCard !== cardUm && !disabilitarClick) {
    clickedCard.classList.add("flip");
    if (!cardUm) {
      return (cardUm = clickedCard);
    }
    cardDois = clickedCard;
    disabilitarClick = true;

    let imagemCardUm = cardUm.querySelector("img").src;
    let imagemCardDois = cardDois.querySelector("img").src;
    matchCards(imagemCardUm, imagemCardDois);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    cardUm.removeEventListener("click", flipCard);
    cardDois.removeEventListener("click", flipCard);

    cardUm = cardDois = "";
    matched++;
    if (matched === 6) {
      setTimeout(() => {
        cards.forEach((card) => {
          card.classList.add("shakeWin");
        }, 200);
      });
      setTimeout(() => {
        return shuffleCards();
      }, 1500);
    }
    return (disabilitarClick = false);
  }
  setTimeout(() => {
    cardUm.classList.add("shake");
    cardDois.classList.add("shake");
  }, 250);

  setTimeout(() => {
    cardUm.classList.remove("shake", "flip");
    cardDois.classList.remove("shake", "flip");
    cardUm = cardDois = "";
    disabilitarClick = false;
  }, 600);
}

function shuffleCards() {
  matched = 0;
  cardUm = cardDois = "";
  let arr = [4, 6, 8, 10, 12, 100, 4, 6, 8, 10, 12, 100];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    card.classList.remove("shakeWin");
    card.addEventListener("click", flipCard);
    setTimeout(()=>{
      imgTag.src = "../../media/dice/d" + arr[index] + ".png";

    },500);
  });
}

shuffleCards();

cards.forEach((card) => {
  // adding click event to all cards
  card.addEventListener("click", flipCard);
});
