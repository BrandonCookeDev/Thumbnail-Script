#target photoshop

var characterData = importCharacterData();

var doc = app.activeDocument;
var layer = doc.activeLayer;
var charlay1 = doc.activeLayer;
var charlay2 = doc.activeLayer;
var group = layer.parent.layers;
var name1;
var name2;

var p1TagLayer = "Smashtag1";
var p2TagLayer = "Smashtag2";
var roundLayer = "Round";

var textDir = 'Text';
var leftCharactersDir = 'Left Characters';
var rightCharactersDir = 'Right Characters';

var errors = [];


function validatePSD(){
    try{
        //Validate all required layer sets exist
        try{
            doc.layerSets.getByName(leftCharactersDir)
        } catch(e){
            throw new Error('Missing layer set: ' + leftCharactersDir);
        }
    
        try{
            doc.layerSets.getByName(rightCharactersDir)
        } catch(e){
            throw new Error('Missing layer set: ' + rightCharactersDir);
        }

        try{
            doc.layerSets.getByName(textDir)
        } catch(e){
            throw new Error('Missing layer set: ' + textDir);
        }
        
        var rightCharLayerSet = doc.layerSets.getByName(rightCharactersDir);
        var leftCharLayerSet = doc.layerSets.getByName(leftCharactersDir);
        var textLayerSet = doc.layerSets.getByName(textDir);

        //Validate all required text layers exist
        try{
            textLayerSet.layers.getByName(p1TagLayer)
        } catch(e){
            throw new Error('Missing layer: ' + p1TagLayer);
        }
        try{
            textLayerSet.layers.getByName(p2TagLayer)
        } catch(e){
            throw new Error('Missing layer: ' + p2TagLayer);
        }
        try{
            textLayerSet.layers.getByName(roundLayer)
        } catch(e){
            throw new Error('Missing layer: ' + roundLayer);
        }

        var meleeCharacters = importCharacterData();

        //Validate melee characters all have layer sets
        for(var i in meleeCharacters){
            var character = meleeCharacters[i];

            try{
                rightCharLayerSet.layerSets.getByName(character.Name)
            } catch(e){
                throw new Error('No layer set for character ' + character.Name + ' on the right side')
            }

            try{
                leftCharLayerSet.layerSets.getByName(character.Name)
            } catch(e){
                throw new Error('No layer set for character ' + character.Name + ' on the left side');
            }

            var characterLayerSetLeft = leftCharLayerSet.layerSets.getByName(character.Name);
            var characterLayerSetRight = rightCharLayerSet.layerSets.getByName(character.Name);

            //Validate melee characters all have correct color layers
            for(var i in character.Colors){
                var color = character.Colors[i];

                try{
                    characterLayerSetLeft.layers.getByName(color)
                } catch(e){
                    throw new Error('No color layer ' + color + ' for character ' + character.Name + ' on the left side');
                }
                try{
                    characterLayerSetRight.layers.getByName(color)
                } catch(e){
                    throw new Error('No color layer ' + color + ' for character ' + character.Name + ' on the right side');
                }
            }
        }

        return true;
    } catch(e){
        alert(e);
        return false;
    }       
}

//Debug mode flag
//Turn this on to spam alert messages to see where execution is at
var DEBUG = false;
function debug(s){
    if(DEBUG == true)
        alert(s);

    /*
    try{
        var docPath = app.activeDocument.path.fullName;
        var log =  File(docPath + '/singles.log');
        log.encoding = "UTF8";
        log.open("e", "TEXT", "????");
        log.writeln(txt);
        log.close();
    } catch(e){
        throw new Error('debug error: ' + e);
    }
    */
}

function setupFileSystem(tournament){
    try{
        //Create dir for the tournament's thumbnails if not exists
        var doc = app.activeDocument;
        var docPath = app.activeDocument.path.fullName;
        var docName = doc.name;

        alert('Doc path: ' + docPath + '.... \nCreating folder: ' + docPath + '/' + tournament);
        var dir = Folder(docPath + '/' + tournament);
        if(!dir.exists) {
            dir.create();
            alert('Created directory: ' + docPath + '/' + tournament)
        }
        else 
            alert('Directory exists! ' + docPath + '/' + tournament);

        return;
    } catch(e){
        throw new Error('setupFileSystem error: ' + e)
    }
}

function saveJPG(tournament, round, player1, player2){

    var fileName = null;
    try{
        var docPath = app.activeDocument.path.fullName;

        fileName = docPath + '/' + tournament + '/' + tournament + ' -' + round + '-' + player1 + "-" + player2 + ".jpg";
        debug('Saving image: ' + fileName)

        var path = File(fileName);
        var jpgOptions = new JPEGSaveOptions();
        doc.saveAs(path, jpgOptions, true, Extension.LOWERCASE);

        name1= p1TagLayer;
        name2 = p2TagLayer;
    } catch(e){
        throw new Error('saveJPG error: ' + e + '. \nInputs[' + tournament + ', ' + round + ', ' + player1 + ', ' + player2 + '] \nAttempted path: ' + fileName);
    }
}

function switchChar1(char1, color1){

    try{
        //if(layer.kind != LayerKind.TEXT)layer.visible = false;
        debug('getting character directory: ' + leftCharactersDir);
        var charFolder = doc.layerSets.getByName(leftCharactersDir);

        debug('getting layer: ' + char1);
        var layerSetRef = charFolder.layerSets.getByName(char1);

        group = layerSetRef.layers;
        for(var i = 0; i < group.length; i++)
        {
            if(group[i].name == color1)
            {
                doc.activeLayer = group[i];
                charlay1 = doc.activeLayer;
                charlay1.visible = true;
            }
        }
    } catch(e){
        throw new Error('switchChar1 error: ' + e + '. \nInputs[' + char1 + ', ' + color1 + ']' );
    }
}

function switchChar2(char2, color2){

    try{
        //if(layer.kind != LayerKind.TEXT)layer.visible = false;
        debug('getting character directory: ' + leftCharactersDir);
        var charFolder = doc.layerSets.getByName(rightCharactersDir);

        debug('getting layer: ' + char1);
        var layerSetRef = charFolder.layerSets.getByName(char2);

        group = layerSetRef.layers;
        for(var i = 0; i < group.length; i++)
        {
            if(group[i].name == color2)
            {
                doc.activeLayer = group[i];
                charlay2 = doc.activeLayer;
                charlay2.visible = true;
            }
        }
    } catch(e){
        throw new Error('switchChar2 error: ' + e + '. \nInputs[' + char2 + ', ' + color2 + ']' );
    }
}

function changeText(layerName, newText){

    try{
        debug('getting text directroy: ' + textDir);
        var layerSetRef = doc.layerSets.getByName(textDir);

        debug('getting layer: ' + layerName);
        var text = layerSetRef.layers.getByName(layerName);
        
        if(text.kind == LayerKind.TEXT) text.textItem.contents = newText;
        text.visible = true;
        if(layerName == p1TagLayer)
            name1 = text;
        else
            name2 = text;
    } catch(e){
        throw new Error('changeText error: ' + e + '. \nInputs[' + layerName + ', ' + newText + ']' );
    }
}

function validate(characterName, color){
    try{
        var names = [];
        for(var i = 0; i<characterData.length; i++){
            var curCharacter = characterData[i];
            
            names.push(curCharacter.Name);
            
            if(characterName == curCharacter.Name){
                var flag = false;
                for(var c = 0; c < curCharacter.Colors.length; c++){
                    var curColor = curCharacter.Colors[c];
                    if(color == curColor)
                        flag = true;
                }
                if(!flag) throw new Error("\n"+color+" is not a valid color for "+characterName+".\nValid Colors are: \n"+curCharacter.Colors+"\n");
            }
        }
        
        var nameFlag = false;
        for(var n = 0; n < names.length; n++){
            var curName = names[n];
            
            if(curName == characterName)
                nameFlag = true;
        }
        if(!nameFlag) throw new Error(characterName + ' is not a valid character. \nValid characters are: \n'+names+"\n");
        
        /*
        var filtered;
        filtered = _.findWhere(characterData, {"Name": character});
        if(filtered.Colors.indexOf(color) < 0) {
            var msg = color + ' is not a color for ' + character;
            alert(msg);
            throw new Error(msg);
        }
        */
    } catch(e){
        throw new Error('validate error: ' + e + '. \nInputs[' + characterName + ', ' + color + ']' );
    }
}


alert('press ok to validate PSD...')
//First of all, valdate the document
var isValid = validatePSD();
if(isValid){
    try{
        //CSV
        var csvFile = File.openDialog("Open Comma-delimited File","comma-delimited(*.csv):*.csv;");
        
        debug('opening CSV...');
        csvFile.open('r') ;

        debug('reading CSV...');
        var csvString = csvFile.read();

        debug('closing CSV...');
        csvFile.close();

        csvString = csvString.split('\n');
        debug('content: ' + csvString);

        debug('creating output directory')
        setupFileSystem(csvString[1].split(",")[0]);

        debug('validating colors and characters...');

        alert('generating images.....');
        //VALIDATE COLORS FOR CHARACTERS
        for(var s = 1; s<csvString.length; s++){
            var lineData = csvString[s].split(",");

            var char1 = lineData[3];
            var color1 = lineData[4];

            var char2 = lineData[6];
            var color2 = lineData[7];

            debug('line: ' + char1 + ', ' + color1 + ', ' + char2 + ', ' + color2);

            //VALIDATE COLORS AND FAIL IF INCORRECT
            validate(char1, color1);
            validate(char2, color2);
        }

        
            
        debug('parsing CSV')
        //Parses entire CSV
        for(var s = 1; s<csvString.length; s++){
            try{
                var lineData = csvString[s].split(",");
                debug('parsed line: ' + lineData);

                //Process each line of data.
                var tournament = lineData[0];
                var round = lineData[1];

                var player1 = lineData[2];
                var char1 = lineData[3];
                var color1 = lineData[4];

                var player2 = lineData[5];
                var char2 = lineData[6];
                var color2 = lineData[7];

                debug('switching characters');
                //Switch Characters
                switchChar1(char1, color1);
                switchChar2(char2, color2);

                debug('changing text');
                //Change player names
                changeText(p1TagLayer, player1);
                changeText(p2TagLayer, player2);
                changeText(roundLayer, round);

                debug('saving photo');
                //Save photo
                saveJPG(tournament, round, player1, player2);

                debug('resetting layers');
                //Reset the layers
                charlay1.visible = false;
                charlay2.visible = false;
            }
            catch(err){
                alert(err);
                //errors.push(err);
            }
        }

        var ret = 'Completed \n';
        for(var i=0; i < errors.length; i++){
            errors += errors[i].message + ' \n';
        }

        alert(ret);
    } catch(e){
        alert("Error: " + e);
    }
}

function importCharacterData(){
	return [{Name:"Bowser",Colors:["Neutral","Black","Blue","Red"]},{Name:"Donkey Kong",Colors:["Neutral","Black","Blue","Green","Red"]},{Name:"Dr. Mario",Colors:["Neutral","Black","Green","Blue","Red"]},{Name:"Falco",Colors:["Neutral","Red","Green","Blue"]},{Name:"Captain Falcon",Colors:["Neutral","Red","Blue","Green","Pink","Black"]},{Name:"Fox",Colors:["Neutral","Green","Blue","Red"]},{Name:"Mr. Game and Watch",Colors:["Neutral","Blue","Green","Red"]},{Name:"Ganondorf",Colors:["Neutral","Blue","Purple","Green","Blue","Red"]},{Name:"Ice Climbers",Colors:["Neutral","Orange","Red","Green"]},{Name:"Kirby",Colors:["Neutral","White","Blue","Green","Red","Yellow"]},{Name:"Link",Colors:["Neutral","White","Black","Red","Blue"]},{Name:"Luigi",Colors:["Neutral","Blue","White","Pink"]},{Name:"Mario",Colors:["Neutral","Yellow","Black","Green","Blue"]},{Name:"Marth",Colors:["Neutral","White","Black","Green","Red"]},{Name:"MewTwo",Colors:["Neutral","Green","Blue","Yellow"]},{Name:"Ness",Colors:["Neutral","Green","Blue","Yellow"]},{Name:"Peach",Colors:["Neutral","Yellow","White","Green","Blue"]},{Name:"Pichu",Colors:["Neutral","Blue","Red","Green"]},{Name:"Pikachu",Colors:["Neutral","Green","Blue","Red"]},{Name:"Jigglypuff",Colors:["Neutral","Red","Yellow","Green","Blue"]},{Name:"Roy",Colors:["Neutral","Yellow","Red","Green","Blue"]},{Name:"Samus",Colors:["Neutral","Green","Purple","Black","Pink"]},{Name:"Sheik",Colors:["Neutral","Blue","Red","Green","White"]},{Name:"Yoshi",Colors:["Neutral","Pink","Blue","LightBlue","Yellow","Red"]},{Name:"Young Link",Colors:["Neutral","Black","White","Blue","Red"]},{Name:"Zelda",Colors:["Neutral","White","Green","Blue","Red"]}];
}