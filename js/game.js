/**
 * Created by dev on 7/29/15.
 */
function Game() {
    this.colors = ['red', 'white', 'yellow', 'green', 'black'];
    this.answers = 0;
    this.pass = 0;
    this.fail = 0;
    this.totalTime = 0;
    $('.pointer').css({ left: -($('.pointer')[0].getBoundingClientRect().width / 2) });
}

Game.prototype.start = function(level) {
    if (!level) {
        level = 1;
    }
     {
        this.ask();
    }
}

Game.prototype.countdownStart = function() {
    this.startTime = performance.now();
    var self = this;
    $('#timeline .pointer').animate({
        left: '100%'
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
    $('#timeline .pointer').stop();
    this.totalTime += endTime - this.startTime;
}

Game.prototype.ask = function() {
    this.countdownStart();
    var color = this.colors[Math.round(Math.random() * this.colors.length)];
    $('#question').after('<br><div class="' + color + ' circle asked">' + color + '</div>');

    var self = this;

    $('.circle.generic').click(function() {
        self.countdownStop();
        if ($(this).text().trim().toLowerCase() == $('.circle.asked').text()) {
            self.pass++;
        } else {
            self.fail++;
        }
        console.log('Correct answers: ' + self.pass);
        console.log('Incorrect answers: ' + self.fail);
        console.log('Time spent: ' + Math.round(self.totalTime) / 1000 + ' seconds');
    })
}