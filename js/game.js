/**
 * Created by ozzy on 7/29/15.
 */
function Game() {
    this.colors = ['red', 'white', 'yellow', 'green', 'black'];
    this.answers = 0;
    this.pass = 0;
    this.fail = 0;
    this.questionsAnswered = 0;
    this.level = 1;
    this.totalTime = 0;
}

Game.prototype.start = function(level) {
    this.ask();
}

Game.prototype.countdownStart = function() {
    this.startTime = performance.now();
    var self = this;
    $('.pointer:not(.runner)').css('left', '0%');
    $('.pointer:not(.runner)').animate({
        left: '100%'
    }, {
        duration: 10000,
        easing: 'linear',
        complete: function() {
            self.countdownStop();
            $('.circle.generic').off('click');
            self.fail++;
            self.questionsAnswered++;
            self.end();
        }
    });
}

Game.prototype.countdownStop = function() {
    var endTime = performance.now();
    $('.pointer:not(.runner)').stop();
    $('.circle.generic').off('click');
    this.totalTime += endTime - this.startTime;
}

Game.prototype.end = function() {
    if (this.level < 3 && this.questionsAnswered < 20) {
        this.ask();
    } else if (this.level == 3 && this.questionsAnswered < 10) {
        this.ask();
    } else {
        $('#game').hide();
        $('#results').show();
        var summary = $('#results table tbody');
        $(summary).append('<tr><td colspan="2" class="thead">Level ' + this.level + ' score</td></tr>');
        $(summary).append('<tr><td>Correct answers:</td><td>' + this.pass + '</td></tr>');
        $(summary).append('<tr><td>Incorrect answers:</td><td>' + this.fail + '</td></tr>');
        $(summary).append('<tr><td>Time spend:</td><td>' + Math.round(this.totalTime) / 1000 + ' sec</td></tr>');
        this.pass = 0;
        this.fail = 0;
        this.questionsAnswered = 0;
        this.totalTime = 0;
        if (this.level < 3) {
            this.level++;
            var next = $('<div><span>Ready for next level?</span><br></div>');
            var btnnext = $('<input type="button" value="    Go!    ">');
            var self = this;
            $(next).append(btnnext);
            $(btnnext).click(function () {
                $(next).remove();
                $('#results').hide();
                $('#game').show();
                self.ask();
            });
            $('#results').append(next);
        }
    }
}

Game.prototype.ask = function() {
    this.countdownStart();
    $('.asked').remove();
    var color;
    var randIndex = Math.floor(Math.random() * this.colors.length);
    var color = this.colors[randIndex];
    if (this.level == 1) {
        $('#question').append('<h1 class="asked ' + color + '">' + color + '</h1>');
    }
    if (this.level == 2) {
        var color2;
        var rand2 = Math.floor(Math.random() * this.colors.length);
        while (rand2 == randIndex) {
            rand2 = Math.floor(Math.random() * this.colors.length);
        }
        color2 = this.colors[rand2];
        $('#question').append('<h1 class="asked ' + color2 + '">' + color + '</h1>');
    }
    if (this.level == 3) {
        var color2;
        var nextword = '';
        for (var i = 0; i < color.length; i++) {
            var rand2 = Math.floor(Math.random() * this.colors.length);
            while (rand2 == randIndex) {
                rand2 = Math.floor(Math.random() * this.colors.length);
            }
            color2 = this.colors[rand2];
            nextword += '<span class="' + color2 + '">' + color[i] + '</span>';
        }
        $('#question').append('<h1 class="asked">' + nextword + '</h1>');
    }

    var self = this;
    var response = true,
        clicks = 0;
    $('.circle.generic').click(function() {
        if (self.level < 3) {
            self.countdownStop();
            if ($('#question .asked').attr('class').indexOf($(this).text().trim().toLowerCase()) > 0) {
                self.pass++;
            } else {
                self.fail++;
            }
            self.questionsAnswered++;
            self.end();
        } else {
            if (clicks < $('#question .asked').text().length - 1) {
                if ($('#question .asked span:eq(' + clicks + ')').attr('class').indexOf($(this).text().trim().toLowerCase()) < 0) {
                    if (response) {
                        response = false;
                    }
                }
                clicks++;
            } else {
                self.countdownStop();
                if (response) {
                    self.pass++;
                } else {
                    self.fail++;
                }
                self.questionsAnswered++;
                self.end();
            }
        }
    })
}