var CONTENT;
var MAIN_PAGE;

function MainPage() {
    this.element;

    this.construct();
}

MainPage.prototype.construct = function() {
    this.element = document.createElement('div');

    var infoBox = document.createElement('div');
    infoBox.className = 'info';
    var par1 = document.createElement('p');
    par1.innerHTML =
        'Rithmomachy is Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in lacus' +
        ' enim. Nulla et quam eu tellus vehicula aliquet tempus eu sem. Ut erat mauris, hendrerit' +
        ' vitae convallis id, bibendum nec eros. Quisque risus ipsum, pulvinar eu hendrerit non, ' +
        'accumsan non tortor. Suspendisse et semper risus. Nulla facilisi. Donec accumsan, ipsum ' +
        'id elementum cursus, lectus odio dictum nisl, vel vulputate nulla sem tristique elit. ' + 
        'Sed in purus ut lectus molestie suscipit. Fusce eleifend iaculis justo, at dictum lacus ' +
        'tempor eget. Mauris eget mi purus, a lobortis dui. Sed ac quam nisi. Maecenas ultricies ' +
        'massa ut arcu rhoncus pretium.';
    infoBox.appendChild(par1);
    var par2 = document.createElement('p');
    par2.innerHTML = 
        'Read more about Rithmomachy on <a href="http://en.wikipedia.org/wiki/Rithmomachy" ' + 
        'target="_blank">Wikipedia</a>.';
    infoBox.appendChild(par2);
    this.element.appendChild(infoBox);

    this.createRulesButton();
    this.createPlayButton();
};

MainPage.prototype.createPlayButton = function() {
    var playButton = document.createElement('div');
    playButton.className = 'largeButton info';
    playButton.innerHTML = '<h1>Play Rithmomachy!</h1>';
    playButton.addEventListener('click', play);
    this.element.appendChild(playButton);
};

MainPage.prototype.createRulesButton = function() {
    var rulesButton = document.createElement('div');
    rulesButton.className = 'largeButton info';
    rulesButton.innerHTML = '<h1>Learn the Rules</h1>';
    this.element.appendChild(rulesButton);
};

MainPage.prototype.show = function(hide) {
    if(hide) {
        CONTENT.show(this.element);
    } else {
        CONTENT.showWithOutHide(this.element);
    }
};

function Content() {
    this.element = document.getElementById('content');
    this.showAtEnd;
    this.callback;
}

Content.HIDE_INTERVAL = 14;
Content.HIDE_PERCENT_INCREMENT = .05;

Content.prototype.showWithOutHide = function(element) {
    this.element.innerHTML = '';
    this.element.appendChild(element);
};

Content.prototype.show = function(element, callback) {
    this.showAtEnd = element;
    this.callback = callback;
    hideContent(0);
};

Content.prototype.hide = function(percent) {
    if(percent >= 1) {
        this.element.innerHTML = '';
        this.element.appendChild(this.showAtEnd);
        this.element.style.opacity = '';
        this.element.style.top = '0px';

        if(this.callback) {
            this.callback();
        }
        return;
    }
    var opac = 1 - percent;
    opac = Math.round(opac * 100) / 100
    this.element.style.opacity = opac;
    this.element.style.top = '-' + parseInt((percent * 500)) + 'px';
};

function hideContent(percent) {
    CONTENT.hide(percent);
    if(percent < 1) {
        setTimeout('hideContent(' + (percent + Content.HIDE_PERCENT_INCREMENT) + ')',
            Content.HIDE_INTERVAL);        
    }
}

function play() {
    new GameSetup().show();
}

window.addEventListener('DOMContentLoaded', function() {
    CONTENT = new Content();
    MAIN_PAGE = new MainPage()
    MAIN_PAGE.show(false);
});