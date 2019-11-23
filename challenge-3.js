/*
challenge

1. loose entire score when roll two 6 in a row and next player.

2. add input field to the html where allowed players change the predefined score.

3. add another dice. if one of them is 1, loose current and next player
*/

var scores, roundScore, activePlayer, gamePlaying, point, dice_1, dice_2;

init();


//click btn to roll the dice
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //1. get Random Number
        dice_1 = Math.floor(Math.random() * 6) + 1;
        dice_2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM_1 = document.getElementById('dice_1');
        var diceDOM_2 = document.getElementById('dice_2');
        diceDOM_1.style.display = 'block';
        diceDOM_1.src = 'dice-' + dice_1 + '.png';
        diceDOM_2.style.display = 'block';
        diceDOM_2.src = 'dice-' + dice_2 + '.png';

        //3. update the round score if one of the rolled numbers is not 1          
        if (dice_1 == 1 || dice_2 == 1) {
            nextPlayer();
            document.getElementById('dice_1').style.display = 'none';
            document.getElementById('dice_2').style.display = 'none';
        } else {
            roundScore += dice_1 + dice_2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }      
    }   

});//event called by btn(event caller)


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector('.inputScore').value;
        // undefined, 0, null or"" are COERCED to false
        // anything else is COERCED to true
        
        if (input) {
            point = input;
        } else {
            point = 100;
        }
        
        //check if player win the game
        if (scores[activePlayer] >= point) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice_1').style.display = 'none';
            document.getElementById('dice_2').style.display = 'none';
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
    document.getElementById('dice_1').style.display = 'none';
    document.getElementById('dice_2').style.display = 'none';

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




