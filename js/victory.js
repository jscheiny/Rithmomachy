function trim(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function Victory(name, english, type, description, fields, victoryCheck) {
    this.name = name;
    this.english = english;
    this.type = type;
    this.description = description;
    this.victoryCheck = victoryCheck;

    this.fields = fields;
    this.fieldValues = null;

    this.element = null;
    this.gameSetup = null;
    this.selected = true;
};

Victory.prototype.getName = function() {
    return this.name;
};

Victory.prototype.getFields = function() {
    return this.fields;
}

Victory.prototype.getFieldValues = function() {
    return this.fieldValues;
}

Victory.prototype.getElement = function(gameSetup) {
    this.gameSetup = gameSetup;
    this.element = document.createElement('div');
    this.element.className = 'victory';

    var title = document.createElement('div');
    title.className = 'title';
    title.innerHTML = this.name;
    this.element.appendChild(title);

    var subtitle = document.createElement('div');
    subtitle.className = 'english';
    subtitle.innerHTML = '&quot;' + this.english + '&quot;';
    this.element.appendChild(subtitle);

    this.element.addEventListener('click', this.createClickAction());
    return this.element;
};

Victory.prototype.createClickAction = function() {
    var victory = this;
    return function(ev) {
        victory.setSelected(true);
    }
};

Victory.prototype.isSelected = function() {
    return this.selected;
};

Victory.prototype.setSelected = function(selected) {
    this.selected = selected;
    this.element.className = 'victory' + (this.selected ? ' selected' : '');
    if(this.selected) {
        this.gameSetup.setSelectedVictory(this);
        
        var victoryBox = document.getElementById('victory');
        victoryBox.innerHTML = '';
        var par = document.createElement('p');
        par.innerHTML = this.description;
        victoryBox.appendChild(par);

        this.createFields(victoryBox);
    }
};

Victory.prototype.createFields = function(victoryBox) {
    if(this.fields) {
        var table = document.createElement('table');
        table.id = 'fieldsTable';

        for(var i = 0; i < this.fields.length; i++) {
            var row = document.createElement('tr');

            var labelCell = document.createElement('td');
            var fieldLabel = document.createElement('b');
            fieldLabel.innerHTML = this.fields[i] + ': ';
            labelCell.appendChild(fieldLabel);
            row.appendChild(labelCell);

            var fieldCell = document.createElement('td');
            var field = document.createElement('input');
            field.type = 'text';
            field.id = 'field' + i;
            fieldCell.appendChild(field);
            row.appendChild(fieldCell);

            table.appendChild(row);
        }

        victoryBox.appendChild(table);

    }
};

Victory.prototype.readFieldValues = function() {
    if(this.fields) {
        this.fieldValues = [];
        for(var i = 0; i < this.fields.length; i++) {
            var input = document.getElementById('field' + i).value;
            input = parseInt(trim(input));
            this.fieldValues.push(input);
        }
    }
};

Victory.prototype.getInputErrors = function() {
    if(this.fields) {
        var errors = [];
        for(var i = 0; i < this.fields.length; i++) {
            var input = document.getElementById('field' + i).value;
            input = trim(input);

            if(input == '') {
                errors.push('Input for "' + this.fields[i] + '" is empty.');

            } else{
                var num = parseInt(input);
                if(isNaN(num) || num <= 0) {
                    errors.push('Input for "' + this.fields[i] + '" is not a positive integer.');
                }
            }
        }

        return errors;
    }
    return [];
};

var DE_CORPORE = new Victory('De Corpore', 'By Body', 'Common',
    'If a player captures a certain number of pieces set by both players, they win the game.',
    ['Number of pieces captured'],
    null);

var DE_BONIS = new Victory('De Bonis', 'By Goods', 'Common',
    'If a player captures enough pieces to add up to or exceed a certain value that is set by ' +
    'both players, they win the game.',
    ['Total value of pieces captured'],
    null); 

var DE_LITE = new Victory('De Lite', 'By Lawsuit', 'Common',
    "If a player captures enough pieces to add up to or exceed a certain value that is set by " +
    "both players, and the number of digits in their captured pieces' values are less than a " +
    "number set by both players, they win the game.",
    ['Number of pieces captured', 'Digits in captured pieces'],
    null);

var DE_HONORE = new Victory('De Honore', 'By Honor', 'Common',
    "If a player captures enough pieces to add up to or exceed a certain value that is set by " +
    "both players, and the number of pieces he captured are less than a certain number set by " +
    "both players, he wins the game.",
    ['Total value of pieces captured', 'Number of pieces captured'],
    null);

var DE_HONORE_LITEQUE = new Victory('De Honore Liteque', 'By Honor and Lawsuit', 'Common', 
    "If a player captures enough pieces to add up to or exceed a certain value that is set by " +
    "both players, the number of digits in their captured pieces' values are less than a number " +
    "set by both players, and the number of pieces they captured are less than a certain number " +
    "set by both players, they win the game.",
    ['Number of pieces captured', 'Digits in captured pieces', 'Number of pieces captured'],
    null);

var VICTORIA_MAGNA = new Victory('Victoria Magna', 'Great Victory', 'Proper',
    "This occurs when three pieces that are arranged are in an arithmetic progression.",
    null);

var VICTORIA_MAJOR = new Victory('Victoria Major', 'Greater Victory', 'Proper',
    "This occurs when four pieces that are arranged have three pieces that are in a certain " +
    "progression, and another three pieces that are in another type of progression.",
    null);

var VICTORIA_EXCEL = new Victory('Victoria Excellentissima', 'Most Excellent Victory', 'Proper',
    "This occurs when four pieces that are arranged have all three types of mathematical " +
    "progressions in three different groups.", 
    null);

var VICTORIES = [DE_CORPORE, DE_BONIS, DE_LITE, DE_HONORE, DE_HONORE_LITEQUE, VICTORIA_MAGNA,
    VICTORIA_MAJOR, VICTORIA_EXCEL];
