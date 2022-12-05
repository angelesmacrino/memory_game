//*******GAME VARIABLES **********//
const images = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h'
  ]
  let gameBoard = null;
  let startButton = null;
  let tiles = [];
  let selectedCard = null;
  let selectedCardIndex = null

  let hours = `00`,
      minutes = `00`,
      seconds = `00`,
      chronometerDisplay = document.getElementById('gameChrono'),
      chronometerCall

  /*DOM content loaded*/
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', gameSetup());
  } else {
    gameSetup();
  }
  /*GAME SETUP*/
  function gameSetup () {
    startButton = document.getElementById('startGameButton');
    startButton.addEventListener('click', startGame);
  
  }
  function startGame () {

    chronometerDisplay.classList.remove('d-none');
    startButton.classList.add('d-none');
    chronometerCall = setInterval(chronometer, 1000);
    addTileElements();
    createGameBoard();
  }
  //create tiles
  function addTileElements () {
    for (let i = 0; i < 8; i++) {
      tiles.push({ identifier: images[i], solved: false })
    }
    tiles = tiles.concat(tiles)
    tiles = shuffle(tiles)
  }
  //add tiles to the board, with their values
  function createGameBoard () {
    gameBoard = document.getElementById('gameBoard');
    gameBoard.classList.remove('d-none');
    for (let j = 0; j < tiles.length; j++) {
      const image = createImage(j)
      const card = createCard(j)
      card.appendChild(image)
      gameBoard.appendChild(card)
    }
  }
  function createImage (j) {
    const image = document.createElement('img');
    image.setAttribute('src', './img/back.png')
    image.setAttribute('id', `image ${j}`)
    return image
  }
  function createCard (j) {
    const card = document.createElement('div');
    card.classList.add('boardCard')
    card.setAttribute('id', `tile ${j}`)
    card.addEventListener('click', swap)
    return card
  }
  function shuffle (array) {
    return array.sort(() => Math.random() - 0.5);
  }
  /**********************WHEN CLICKING A CARD***************************/
  function swap (e) {
    const clickedCard = document.getElementById(e.srcElement.id)
    if (!tiles[clickedCard.id.split(' ')[1]].solved) { checkEquality(clickedCard); }
  }
  
  function checkEquality (clickedCard) {
    const clickedCardIndex = tiles[clickedCard.id.split(' ')[1]];
    //if not previous selected card
    if (!selectedCard) {
      selectedCard = clickedCard
      selectedCardIndex = tiles[selectedCard.id.split(' ')[1]]
      swapCard(clickedCard, clickedCardIndex)
    } else {
      //when same card clicked
      // eslint-disable-next-line no-lonely-if
      if (clickedCard === selectedCard) {
        swapCard(clickedCard, clickedCardIndex)
        selectedCard = null
        selectedCardIndex = null
      } else if (selectedCardIndex.identifier === clickedCardIndex.identifier) {
        swapCard(clickedCard, clickedCardIndex)
        gameBoard.style.pointerEvents = 'none';
        setTimeout(function () {
          swapCard(clickedCard, clickedCardIndex)
          swapCard(selectedCard, selectedCardIndex)
          solvePair(clickedCard)
          selectedCard = null
          selectedCardIndex = null
          gameBoard.style.pointerEvents = 'auto';
        }, 1000);
      } else {
        swapCard(clickedCard, clickedCardIndex)
        gameBoard.style.pointerEvents = 'none';
        setTimeout(function () {
          swapCard(clickedCard, clickedCardIndex)
          swapCard(selectedCard, selectedCardIndex)
          selectedCard = null
          selectedCardIndex = null
          gameBoard.style.pointerEvents = 'auto';
        }, 1000);
      }
    }
    //si no tengo una seleccionada de antes, selecciono la clickeada y la muestro
  }

  /***CHRONOMETER ******/
  function chronometer() {

    seconds ++

    if (seconds < 10) seconds = `0` + seconds

    if (seconds > 59) {
      seconds = `00`
      minutes ++

      if (minutes < 10) minutes = `0` + minutes
    }

    if (minutes > 59) {
      minutes = `00`
      hours ++
      
      if (hours < 10) hours = `0` + hours
    }

    chronometerDisplay.textContent = `${hours}:${minutes}:${seconds}`

  }

  
  function swapCard (clickedCard, clickedCardIndex) {
    clickedCard.setAttribute('src', clickedCard.getAttribute('src') === './img/back.png' ? './img/' + clickedCardIndex.identifier + '.png' : './img/back.png')
  }
  function solvePair (clickedCard) {
    tiles[selectedCard.id.split(' ')[1]].solved = true
    tiles[clickedCard.id.split(' ')[1]].solved = true
    clickedCard.setAttribute('src', './img/solved.png')
    selectedCard.setAttribute('src', './img/solved.png')
    checkFinishGame()
  }
  
  function checkFinishGame () {
    const uncompletedTiles = tiles.filter((tile) => {
      return tile.solved === false
    })
    if (uncompletedTiles.length === 0) { finishGame() }
  }
  
  function finishGame () {
    clearGameBoard();
    gameBoard.classList.add('d-none');
    tiles.length = 0;
    startButton.classList.remove('d-none');
  }
  
  function clearGameBoard () {
    while (gameBoard.firstChild) {
      gameBoard.firstChild.remove();
    }
  }
  