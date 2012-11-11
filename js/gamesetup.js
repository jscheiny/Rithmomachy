function GameSetup() {
    this.player1name = '';
    this.player2name = '';
    this.victory = null;
    this.element = null;

    this.construct();
}

GameSetup.prototype.show = function() {
    CONTENT.show(this.element, function() {
        VICTORIES[0].setSelected(true);
    });
};

GameSetup.prototype.construct = function() {
    this.element = document.createElement('div');
    this.element.className = 'info';

    this.createReturnButton();

    var title = document.createElement('h1');
    title.innerHTML = 'Game Settings';
    this.element.appendChild(title);

    this.createPlayersTable();
    this.createVictoriesTable();
    this.createPlayButton();

    var errors = document.createElement('div');
    errors.id = 'errors';
    this.element.appendChild(errors);
};

GameSetup.prototype.createReturnButton = function() {
    var returnButton = document.createElement('div');
    returnButton.id = 'returnButton'
    returnButton.innerHTML = 'Return';
    returnButton.addEventListener('click', function() {
        MAIN_PAGE.show(true);
    })
    this.element.appendChild(returnButton);
};

GameSetup.prototype.createPlayersTable = function() {
    var playerTable = document.createElement('table');
    playerTable.cellSpacing = '0';
    playerTable.cellPadding = '0';
    playerTable.id = 'playerTable';
    var playerRow = document.createElement('tr');

    var player1cell = document.createElement('td');
    var player1label = document.createElement('span');
    player1label.innerHTML = 'Player 1 Name:';
    player1cell.appendChild(player1label);
    player1cell.appendChild(document.createElement('br'));
    player1cell.appendChild(this.createTextField('p1name'));

    var player2cell = document.createElement('td');
    var player2label = document.createElement('span');
    player2label.innerHTML = 'Player 2 Name:';
    player2cell.appendChild(player2label);
    player2cell.appendChild(document.createElement('br'));
    player2cell.appendChild(this.createTextField('p2name'));

    playerRow.appendChild(player1cell);
    playerRow.appendChild(player2cell);
    playerTable.appendChild(playerRow);
    this.element.appendChild(playerTable);
};

GameSetup.prototype.createVictoriesTable = function() {
    var victoryTitle = document.createElement('h2');
    victoryTitle.innerHTML = 'Victory Conditions:';
    this.element.appendChild(victoryTitle);

    var victoryTable = document.createElement('table');
    victoryTable.cellSpacing = '0';
    victoryTable.cellPadding = '0';
    victoryTable.id = 'victoryTable';
    for(var i = 0; i < VICTORIES.length; i += 2) {
        var row = document.createElement('tr');

        var col1 = document.createElement('td');
        var vBox1 = VICTORIES[i].getElement(this, i == 0);
        col1.appendChild(vBox1);
        row.appendChild(col1);

        if(i + 1 != VICTORIES.length) {
            var col2 = document.createElement('td');
            var vBox2 = VICTORIES[i + 1].getElement(this);
            col2.appendChild(vBox2);
            row.appendChild(col2);
        }
        victoryTable.appendChild(row);
    }
    this.element.appendChild(victoryTable);

    var victoryBox = document.createElement('div');
    victoryBox.id = 'victory';
    this.element.appendChild(victoryBox);
};

GameSetup.prototype.createPlayButton = function() {
    var playButton = document.createElement('div');
    playButton.id = 'playButton';
    playButton.innerHTML = '<h1>Play Game</h1>';
    playButton.addEventListener('click', this.createPlayButtonListener());
    this.element.appendChild(playButton);
};

GameSetup.prototype.checkForErrors = function() {
    var errors = document.getElementById('errors');
    errors.innerHTML = '';

    var victoryErrors = this.victory.getInputErrors();
    if(victoryErrors.length != 0) {
        var errorsTitle = document.createElement('span');
        errorsTitle.innerHTML = 'Please resolve the following issue' +
            (errors.length == 1 ? ':' : 's:');
        errors.appendChild(errorsTitle);
        errors.appendChild(document.createElement('br'));

        for(var i = 0; i < victoryErrors.length; i++) {
            var error = document.createElement('div');
            error.className = 'error';
            error.innerHTML = victoryErrors[i];
            errors.appendChild(error);
        }

        return true;
    }

    return false;
};

GameSetup.prototype.createGame = function() {
    this.victory.readFieldValues();
    var p1name = encodeURI(trim(document.getElementById('p1name').value));
    if(p1name == '') p1name = 'Player 1';
    var p2name = encodeURI(trim(document.getElementById('p2name').value));
    if(p2name == '') p2name = 'Player 2';

    new Rithmomachy(p1name, p2name, this.victory).show();
};

GameSetup.prototype.createPlayButtonListener = function() {
    var setup = this;
    return function() {
        if(!setup.checkForErrors()) {
            setup.createGame();
        }
    }
};

GameSetup.prototype.createTextField = function(id) {
    var input = document.createElement('input');
    input.type = 'text';
    input.id = id;

    return input;
};

GameSetup.prototype.setSelectedVictory = function(victory) {
    if(this.victory != null && this.victor != victory) {
        this.victory.setSelected(false);
    }
    this.victory = victory;
};
