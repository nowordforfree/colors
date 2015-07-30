/**
 * Created by ozzy on 7/29/15.
 */
$(function() {
    $('#game').hide();
    var button = $('<input type="button" value="  Let\'s play!  "/>');
    $(button)
        .css({
            margin:'100px auto',
        })
        .click(function() {
            $(this).remove();
            var guesscolor = new Game();
            $('#game').show();
            guesscolor.start(1);
        })
    $('#wrapper').append(button);
})