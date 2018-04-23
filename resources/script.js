$(document).ready(function(){
    // Locates the page elements and sets the gameplay parameters
    var values = {
        water: {
            string: 'water',
            bar: $('#water-bar'),
            button: $('#water-button'),
            delay: 2500,
            css: {'width': '0%', 'transition': 'width 8s linear'}
        },
        love: {
            string: 'love',
            bar: $('#love-bar'),
            button: $('#love-button'),
            delay: 1000,
            css: {'width': '0%', 'transition': 'width 4s linear'}
        },
        light: {
            string: 'light',
            bar: $('#light-bar'),
            button: $('#light-button'),
            delay: 1500,
            css: {'width': '0%', 'transition': 'width 6s linear'}
        }
    }

    // Establishes the game mechanics
    game = function(value){
        // triggers auto-decay of a bar
        value.bar.delay(value.delay).queue(function(){value.bar.css(value.css)});

        // refills a bar on button click, then re-decays it after delay time
        value.button.click(function(){
            value.bar.css({'width': '100%', 'transition': 'width 0.5s linear'});
            setTimeout(function(){value.bar.css(value.css)}, value.delay);
        });

        // stops bars from decaying upon plant death
        death = function(value){
            var computedWidth = value.bar.css('width');
            value.bar.css({'transition': 'none'});
            value.bar.css('width', computedWidth);
        }

        // kills plant when a bar is empty
        var failAlert = setInterval(function(){
            if (parseInt(value.bar.css('width').slice(0, -2)) <= 0){
                $('#fail-alert').removeClass('hide');
                $('#error-code').html(value.string);
                death(values.water);
                death(values.love);
                death(values.light);
                timer.stop();
                clearInterval(failAlert);
            };
        }, 300);
    }

    // Allows the player to select their cactus
    $('#start-screen img').click(function(){
        var selection = $(this).attr("src");
        $('#start-screen').addClass("hide");
        $('#game').removeClass("hide");
        $('#selected-plant').attr("src", selection)

        // Starts the game
        game(values.water);
        game(values.love);
        game(values.light);
    });

    // Uses EasyTimer.js to create a timer
    var timer = new Timer();
    timer.start({precision: 'secondTenths'});
    timer.addEventListener('secondTenthsUpdated', function (e) {
        var endTime = timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths']);
        $('#timer .values').html(endTime);
    });  
});