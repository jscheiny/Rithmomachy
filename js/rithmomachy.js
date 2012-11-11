
function Rithmomachy(p1name, p2name, victory) {
    this.p1name = p1name;
    this.p2name = p2name;
    this.victory = victory;
    this.element = null;
    this.boardElement = null;
    this.p1info = null;
    this.p2info = null;

    this.construct();
}

Rithmomachy.ROWS = 8;
Rithmomachy.COLS = 16;

Rithmomachy.prototype.construct = function() {
    this.element = document.createElement('div');
    this.element.id = 'rithmomachy';

    this.createToolbar();
    this.createPlayer1Info();
    this.createBoard();
    this.createPlayer2Info();
};

Rithmomachy.prototype.createToolbar = function() {
    var toolbar = document.createElement('div');
    toolbar.className = 'info';
    toolbar.id = 'toolbar';

    var table = document.createElement('table');
    table.id = 'toolbarTable';
    var row = document.createElement('row');

    this.createHomeButton(row);
    this.createNewGameButton(row);
    this.createVictoryTypeLabel(row);
    this.createVictoryFieldLabels(row);

    table.appendChild(row);
    toolbar.appendChild(table);

    this.element.appendChild(toolbar);
};

Rithmomachy.prototype.createHomeButton = function(container) {
    var homeCell = document.createElement('td');
    var home = document.createElement('div');
    home.className = 'smallButton';
    home.innerHTML = 'Return Home';
    home.addEventListener('click', this.createHomeButtonListener());
    homeCell.appendChild(home);
    container.appendChild(homeCell);
};

Rithmomachy.prototype.createHomeButtonListener = function() {
    return function() {
        MAIN_PAGE.show(true);
    }
};

Rithmomachy.prototype.createNewGameButton = function(container) {
    var newGameCell = document.createElement('td');
    var newGame = document.createElement('div');
    newGame.className = 'smallButton';
    newGame.innerHTML = 'New Game';
    newGame.addEventListener('click', this.createNewGameButtonListener());
    newGameCell.appendChild(newGame);
    container.appendChild(newGameCell);
};

Rithmomachy.prototype.createNewGameButtonListener = function() {
    return function() {
        var result = confirm('Are you sure? This game will be lost.');
        if(result) {
            new GameSetup().show();
        }
    }
};

Rithmomachy.prototype.createVictoryTypeLabel = function(container) {
    var victoryCell = document.createElement('td');
    var victoryInfo = document.createElement('span');
    victoryInfo.innerHTML = 'Victory: <b><em>' + this.victory.getName() + '</em></b>';
    victoryCell.appendChild(victoryInfo);
    container.appendChild(victoryCell);
};

Rithmomachy.prototype.createVictoryFieldLabels = function(container) {
    var victoryFieldsCell = document.createElement('td');
    var victoryFields = document.createElement('div');
    victoryFields.id = 'fields';
    if(this.victory.getFields()) {
        var fields = this.victory.getFields();
        var values = this.victory.getFieldValues();
        var html = '';
        for(var i = 0; i < fields.length; i++) {
            html += fields[i] + ': ' + values[i];
            if(i != fields.length - 1) {
                html += '<br />';
            }
        }
        victoryFields.innerHTML = html;
    }
    victoryFieldsCell.valign = "top";
    victoryFieldsCell.appendChild(victoryFields);
    container.appendChild(victoryFieldsCell);
};

Rithmomachy.prototype.createPlayer1Info = function() {
    this.p1info = document.createElement('div');
    this.p1info.id = 'p1info';

    var name = document.createElement('span');
    name.className = 'playerName';
    name.innerHTML = this.p1name;
    this.p1info.appendChild(name);

    this.element.appendChild(this.p1info);
};

Rithmomachy.prototype.createPlayer2Info = function() {
    this.p2info = document.createElement('div');
    this.p2info.id = 'p2info';

    var name = document.createElement('span');
    name.className = 'playerName';
    name.innerHTML = this.p2name;
    this.p2info.appendChild(name);

    this.element.appendChild(this.p2info);
};

Rithmomachy.prototype.createBoard = function() {
    this.boardElement = document.createElement('table');
    this.boardElement.id = 'board';
    this.boardElement.cellSpacing = '0';
    this.boardElement.cellPadding = '0';

    for(var r = 0; r < Rithmomachy.ROWS; r++) {
        var row = document.createElement('tr');
        row.id = 'row' + r;
        for(var c = 0; c < Rithmomachy.COLS; c++) {
            var cell = document.createElement('td');
            cell.className = 'square';
            cell.id = 'r' + r + 'c' + c;

            var img = document.createElement('img');
            img.id = 'img-r' + r + 'c' + c;
            cell.appendChild(img);

            row.appendChild(cell);
        }
        this.boardElement.appendChild(row);
    }
    this.element.appendChild(this.boardElement);
};

Rithmomachy.prototype.show = function() {
    CONTENT.show(this.element, null);
};