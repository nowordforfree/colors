/**
 * Created by ozzy on 7/29/15.
 */
function Game() {
    this.colors = ['red', 'white', 'yellow', 'green', 'black'];
    this.answers = 0;
    this.pass = 0;
    this.fail = 0;
    this.questionsAnswered = 0;
    this.totalTime = 0;
}

Game.prototype.start = function(level) {
    if (!level) {
        level = 1;
    }
    this.ask();
}

Game.prototype.countdownStart = function() {
    this.startTime = performance.now();
    var self = this;
    $('.pointer').css('left', '0%');
    $('.pointer').animate({
        left: '98%'
    }, {
        duration: 10000,
        easing: 'linear',
        complete: function() {
            self.countdownStop();
            $('.circle.generic').off('click');
            self.fail++;
            alert('Too long');
        }
    });
}

Game.prototype.countdownStop = function() {
    var endTime = performance.now();
    $('.pointer').stop();
    $('.circle.generic').off('click');
    this.totalTime += endTime - this.startTime;
}

Game.prototype.end = function() {
    if (this.questionsAnswered < 20) {
        this.ask();
    } else {
        $('#game').hide();
        $('#results').show();
        var summary = $('#results table');
        $(summary).find('tr:nth-child(1) td:nth-child(2)').text(this.pass);
        $(summary).find('tr:nth-child(2) td:nth-child(2)').text(this.fail);
        $(summary).find('tr:nth-child(3) td:nth-child(2)').text(Math.round(this.totalTime) / 1000 + ' sec');
    }
}

Game.prototype.ask = function() {
    this.countdownStart();
    $('.circle.asked').remove();
    var color = this.colors[Math.round(Math.random() * this.colors.length)];
    $('#question').append('<div class="' + color + ' circle asked">' + color + '</div>');

    var self = this;

    $('.circle.generic').click(function() {
        self.countdownStop();
        if ($(this).text().trim().toLowerCase() == $('.circle.asked').text()) {
            self.pass++;
        } else {
            self.fail++;
        }
        self.questionsAnswered++;
        self.end();
    })
}