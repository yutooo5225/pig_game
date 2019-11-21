/*
challenge

1. loose entire score when roll two 6 in a row and next player.

2. add input field to the html where allowed players change the predefined score.

3. add another dice. if one of them is 1, loose current and next player
*/

var scores, roundScore, activePlayer, gamePlaying, lastDice, point;

init();


//click btn to roll the dice
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        inputScore();
        //1. get Random Number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. update the round score if the rolled number is not 1
        if (dice === 6 && lastDice === 6) {
            //Player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            lastDice = -1;
            nextPlayer();

            
        } else if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            lastDice = dice;
        } else {
            nextPlayer();
            document.querySelector('.dice').style.display = 'none';
            lastDice = -1;
        }      
         
    }   

});//event called by btn(event caller)


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player win the game
        if (scores[activePlayer] >= point) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //next players
            nextPlayer();
        }
    }
});


function nextPlayer() {
        //next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

    
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', init);


function init(){
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    
    //hide the  dice at the beginning
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function inputScore(){
    if (point !== 'entre target point'){
    point = document.querySelector('.inputScore').value; 
    } else {
    point = 20;
    }
}

