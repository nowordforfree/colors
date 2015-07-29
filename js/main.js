/**
 * Created by dev on 7/29/15.
 */
$(function() {
    var guesscolor = new Game();
    if (confirm("Are you ready to start the game?")) {
        clearInterval(interval);
        guesscolor.start();
    } else {
        var interval = setInterval(function () {
            if (confirm("Ready now?")) {
                clearInterval(interval);
                guesscolor.start();
            }
        }, 5000);
    }
})