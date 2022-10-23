/*
*       Developer: Giovanni Tshibangu
*       Date: 10/18/2022
* */

// Init Variables
// Store the image names in an array
const imagesList = ['cherry.png', 'grapes.png', 'heart.png', 'lemon.png','orange.png','seven.png','strawberry.png'];

// Interval counter and timer variable
let counters = [0,0,0];
let timer1 = 0;
let timer2 = 0;
let timer3 = 0;
let timers =[timer1,timer2,timer3];

let currentBalance = 50;
let betAmount = 1;

// Initialise Starter value
$('#betAmount').text(betAmount);
$('#slot1').attr("src", "images/"+ imagesList[2]);
$('#slot2').attr("src", "images/"+ imagesList[3]);
$('#slot3').attr("src", "images/"+ imagesList[6]);

// Set  action Listeners
$('#subtractMoney').click(subtractBetAmount);           // Listen to when the user click the minus btn
$('#AddMoney').click(addBetAmount);                     // Listen to when the user click the plus btn
$('#spin').click(payGame);                              // Listen to when the user click the Spin btn

// This function generates Random number based on the length of the List of Images
function generateRandom() {
    return Math.floor(Math.random() * imagesList.length);           // Return random number.
}
function addBetAmount(){
    if(currentBalance < betAmount){         // Check if user balance is smaller than the bet amount
        $('#betAmount').text(betAmount);    // Prevent bet amount from changing
    }
    else{
        $('#betAmount').text(++betAmount);  // Increase Bet amount
    }
}
function subtractBetAmount(){
    if(betAmount!==1){
        $('#betAmount').text(--betAmount);
    }
    else{
        $('#betAmount').text(betAmount);
    }
}
function shuffleImage() {
    $('img').each(function (index, element) {
        timers[index] = setInterval(function rotate() {
            counters[index]++;
            $(element).attr('src', "images/"+ imagesList[generateRandom()]);
            if (index === 0) {
                if (counters[index] === 30) { // 20 is just an arbitrary number
                    clearInterval(timers[index]);
                }
            }
            else if (index === 1) {
                if (counters[index] === 43) { // 30 is just an arbitrary number
                    clearInterval(timers[index]);
                }
            }
            else {
                if (counters[index] === 58) { // 50 is just an arbitrary number
                    clearInterval(timers[index]);
                    checkGame();
                }
            }
        }, 100);
        counters[0] = 0;
        counters[1] = 0;
        counters[2] = 0;
    });
}
function payGame(){
    if(currentBalance<1){
        $('#info').text('You lost all your money');
        $('#info').css({"color":"red"});
        $("#info").fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0);
    }
    if(currentBalance < betAmount){
        $('#info').text('Invalid bet amount, you do not have enough to bet '+betAmount);
        $('#info').css({"color":"red"});
        $("#info").fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 1.9);
    }
    else{
        let info = $('#info');
        info.text('3 of a Kind in a row to Win!');
        info.css({'color':'black'});
        shuffleImage();
    }
}
function checkGame(){
    if (($('#slot1').attr('src') === $('#slot2').attr('src')) && ($('#slot2').attr('src') === $('#slot3').attr('src'))) {
        userWon();
        currentBalance = parseInt(currentBalance) + ((parseInt(betAmount) * 15));
        $('#money').text(currentBalance);
    } else {
        userLost()
        currentBalance = parseInt(currentBalance) - ((parseInt(betAmount)));
        if(currentBalance < 0){
            $("#info").text("You lost all your money!")
            $("#info").css({"color":'red'});
            $("#info").fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0);
        }
        if(currentBalance <0){
            $('#money').text(0);
        }
        else{
            $('#money').text(currentBalance);
        }
    }
}
function userWon(){
    $("#info").text("Congratulations You Won!!!")
    $("#info").css({"color":'red'});
    $("#info").fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0);
}
function userLost(){
    $("#info").text("You Lost, spin again!!!")
    $("#info").css({"color":'red'});
    $("#info").fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0).fadeTo(200, 0.1).fadeTo(200, 1.0);
}








