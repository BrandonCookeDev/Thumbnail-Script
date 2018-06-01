#target photoshop

var characterData = importCharacterData();

var doc = app.activeDocument;
var layer = doc.activeLayer;
var charlay1 = doc.activeLayer;
var charlay2 = doc.activeLayer;
var group = layer.parent.layers;

var name1;
var name2;
var name3;
var name4;

var roundLayer = "Round";
var p1TagLayer = "Smashtag1";
var p2TagLayer = "Smashtag2";
var p3TagLayer = "Smashtag3";
var p4TagLayer = "Smashtag4";

var textDir               = 'Logos and Text';
var leftCharactersP1Dir   = 'Characters Left P1';
var leftCharactersP2Dir   = 'Characters Left P2';
var rightCharactersP3Dir  = 'Characters Right P3';
var rightCharactersP4Dir  = 'Characters Right P4';

var errors = [];

var DEBUG = false;
function debug(s){
    if(DEBUG == true)
        alert(s)
}

function validatePSD(){
    try{
        //Validate all required layer sets exist
        try{
            doc.layerSets.getByName(leftCharactersP1Dir)
        } catch(e){
            throw new Error('Missing layer set: ' + leftCharactersP1Dir);
        }

        try{
            doc.layerSets.getByName(leftCharactersP2Dir);
        } catch(e){
            throw new Error('Missing layer set: ' + leftCharactersP2Dir);
        }
    
        try{
            doc.layerSets.getByName(rightCharactersP3Dir)
        } catch(e){
            throw new Error('Missing layer set: ' + rightCharactersP3Dir);
        }

        try{
            doc.layerSets.getByName(rightCharactersP4Dir);
        } catch(e){
            throw new Error('Missing layer set: ' + rightCharactersP4Dir);
        }

        try{
            doc.layerSets.getByName(textDir)
        } catch(e){
            throw new Error('Missing layer set: ' + textDir);
        }
        
        var rightCharLayerSet = doc.layerSets.getByName(leftCharactersP1Dir);
        var leftCharLayerSet = doc.layerSets.getByName(leftCharactersP2Dir);
        var right2CharLayerSet = doc.layerSets.getByName(rightCharactersP3Dir);
        var left2CharLayerSet = doc.layerSets.getByName(rightCharactersP4Dir)
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
            textLayerSet.layers.getByName(p3TagLayer)
        } catch(e){
            throw new Error('Missing layer: ' + p3TagLayer);
        }
        try{
            textLayerSet.layers.getByName(p4TagLayer)
        } catch(e){
            throw new Error('Missing layer: ' + p4TagLayer);
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

            try{
                right2CharLayerSet.layerSets.getByName(character.Name)
            } catch(e){
                throw new Error('No layer set for character ' + character.Name + ' on the right side p2');
            }

            try{
                left2CharLayerSet.layerSets.getByName(character.Name)
            } catch(e){
                throw new Error('No layer set for character ' + character.Name + ' on the left side p2');
            }

            var characterLayerSetLeft = leftCharLayerSet.layerSets.getByName(character.Name);
            var characterLayerSetRight = rightCharLayerSet.layerSets.getByName(character.Name);
            var characterLayerSetLeft2 = left2CharLayerSet.layerSets.getByName(character.Name);
            var characterLayerSetRight2 = right2CharLayerSet.layerSets.getByName(character.Name);

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

                try{
                    characterLayerSetLeft2.layers.getByName(color)
                } catch(e){
                    throw new Error('No color layer ' + color + ' for character ' + character.Name + ' on the left side p2');
                }
                try{
                    characterLayerSetRight2.layers.getByName(color)
                } catch(e){
                    throw new Error('No color layer ' + color + ' for character ' + character.Name + ' on the right side p2');
                }
            }
        }

        return true;
    } catch(e){
        alert(e);
        return false;
    }       
}

function trim (str) {  
    return str.replace(/^\s+/,'').replace(/\s+$/,'');  
}  

function clearAllCharacters(){
    try{
        var meleeCharacters = importCharacterData();
        var characterLayerSetLeft = leftCharLayerSet.layerSets.getByName(character.Name);
        var characterLayerSetRight = rightCharLayerSet.layerSets.getByName(character.Name);
        var characterLayerSetLeft2 = left2CharLayerSet.layerSets.getByName(character.Name);
        var characterLayerSetRight2 = right2CharLayerSet.layerSets.getByName(character.Name);


        //Validate melee characters all have layer sets
        for(var i in meleeCharacters){
            var character = meleeCharacters[i];
            var characterLayerSetLeft = leftCharLayerSet.layerSets.getByName(character.Name);
            var characterLayerSetRight = rightCharLayerSet.layerSets.getByName(character.Name);

            //Validate melee characters all have correct color layers
            var color = character.Colors[i];

            characterLayerSetLeft.layers.getByName(color).visible = false;
            characterLayerSetRight.layers.getByName(color).visible = false;
            characterLayerSetLeft2.layers.getByName(color).visible = false;
            characterLayerSetRight2.layers.getByName(color).visible = false;
        
        }
    } catch(e){
        throw new Error('clearAllCharacters error: ' + e);
    }
}

function setupFileSystem(tournament){
    try{
        //Create dir for the tournament's thumbnails if not exists
        var doc = app.activeDocument;
        var docPath = app.activeDocument.path.fullName;
        var docName = doc.name;

        alert('Doc path: ' + docPath + '.... \nCreating folder: ' + docPath + '/' + tournament + '-doubles');
        var dir = Folder(docPath + '/' + tournament + '-doubles');
        if(!dir.exists) {
            dir.create();
            alert('Created directory: ' + docPath + '/' + tournament + '-doubles')
        }
        else 
            alert('Directory exists! ' + docPath + '/' + tournament + '-doubles');

        return;
    } catch(e){
        throw new Error('setupFileSystem error: ' + e)
    }
}

function saveJPG(tournament, round, player1, player2, player3, player4){
    var fileName;
    try{
        var docPath = app.activeDocument.path.fullName;

        fileName = docPath + '/' + tournament + '-doubles/' + tournament + ' -' + round + '-' + player1 + "_" + player2 + "-" + player3 + "_" + player4 + ".jpg";
        debug('Saving image: ' + fileName)

        var path = File(fileName);
        var jpgOptions = new JPEGSaveOptions();
        doc.saveAs(path, jpgOptions, true, Extension.LOWERCASE);

        name1= p1TagLayer;
        name2 = p2TagLayer;
        name3 = p3TagLayer;
        name4 = p4TagLayer;
    } catch(e){
        throw new Error('saveJPG error: ' + e + '. \nInputs[' + tournament + ', ' + round + ', ' + player1 + ', ' + player2 + '] \nAttempted path: ' + fileName);
    }
}

function switchChar1(char1, color1){
    try{
        //if(layer.kind != LayerKind.TEXT)layer.visible = false;
        var charFolder = doc.layerSets.getByName(leftCharactersP1Dir);
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
        throw new Error('switchChar1 error: ' + e);
    }
}

function switchChar2(char2, color2){
    try{
        //if(layer.kind != LayerKind.TEXT)layer.visible = false;
        var charFolder = doc.layerSets.getByName(leftCharactersP2Dir);
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
        throw new Error('switchChar2 error: ' + e);
    }
}

function switchChar3(char3, color3){
    try{
        //if(layer.kind != LayerKind.TEXT)layer.visible = false;
        var charFolder = doc.layerSets.getByName(rightCharactersP3Dir);
        var layerSetRef = charFolder.layerSets.getByName(char3);
        group = layerSetRef.layers;
        for(var i = 0; i < group.length; i++)
        {
            if(group[i].name == color3)
            {
                doc.activeLayer = group[i];
                charlay3 = doc.activeLayer;
                charlay3.visible = true;
            }
        }
    } catch(e){
        throw new Error('switchChar3 error: ' + e);
    }
}

function switchChar4(char4, color4){
    try{
        //if(layer.kind != LayerKind.TEXT)layer.visible = false;
        var charFolder = doc.layerSets.getByName(rightCharactersP4Dir);
        var layerSetRef = charFolder.layerSets.getByName(char4);
        group = layerSetRef.layers;
        for(var i = 0; i < group.length; i++)
        {
            if(group[i].name == color4)
            {
                doc.activeLayer = group[i];
                charlay4 = doc.activeLayer;
                charlay4.visible = true;
            }
        }
    } catch(e){
        throw new Error('switchChar2 error: ' + e);
    }
}

function changeText(layerName, newText){
    try{
        var layerSetRef = doc.layerSets.getByName(textDir);
        var text = layerSetRef.layers.getByName(layerName);
        if(text.kind == LayerKind.TEXT) text.textItem.contents = newText;
        text.visible = true;
        if(layerName == p1TagLayer)
            name1 = text;
        else if(layerName == p2TagLayer)
            name2 = text;
        else if(layerName == p3TagLayer)
            name3 = text;
        else
            name4 = text;
    } catch(e){
        throw new Error('changeText error: ' + e);
    }
}


alert("press ok to validate PSD");
/******** MAIN ***********/
var isValid = validatePSD();
if(isValid){
    try{
        //CSV
        var csvFile = File.openDialog("Open Comma-delimited File","comma-delimited(*.csv):*.csv;");
        csvFile.open('r') ;
        var csvString = csvFile.read();
        csvFile.close();
        csvString = csvString.split('\n');

        function validate(characterName, color){
            
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
        }

        //VALIDATE COLORS FOR CHARACTERS
        for(var s = 1; s<csvString.length; s++){
            var lineData = csvString[s].split(",");

            var teamColor1 = trim(lineData[2]);
            var char1 = trim(lineData[4]);
            var char2 = trim(lineData[6]);

            //Team2
            var teamColor2 = trim(lineData[7]);
            var char3 = trim(lineData[9]);
            var char4 = trim(lineData[11]);

            //VALIDATE COLORS AND FAIL IF INCORRECT
            validate(char1, resolveAliasColor(char1, teamColor1));
            validate(char2, resolveAliasColor(char2, teamColor1));
            validate(char3, resolveAliasColor(char3, teamColor2));
            validate(char4, resolveAliasColor(char4, teamColor2));
        }

        //Setup file system
        setupFileSystem(csvString[1].split(",")[0]);


        //Parses entire CSV
        for(var s = 1; s<csvString.length; s++){
            try {
                var lineData = csvString[s].split(",");

                //Process each line of data.
                var tournament = trim(lineData[0]);
                var round = trim(lineData[1]);

                //Team1
                var teamColor1 = trim(lineData[2]);
                var player1 = trim(lineData[3]);
                var char1 = trim(lineData[4]);
                var player2 = trim(lineData[5]);
                var char2 = trim(lineData[6]);

                //Team2
                var teamColor2 = trim(lineData[7])
                var player3 = trim(lineData[8]);
                var char3 = trim(lineData[9]);
                var player4 = trim(lineData[10]);
                var char4 = trim(lineData[11]);

                //Switch Characters
                switchChar1(char1, resolveAliasColor(char1, teamColor1));
                switchChar2(char2, resolveAliasColor(char2, teamColor1));
                switchChar3(char3, resolveAliasColor(char3, teamColor2));
                switchChar4(char4, resolveAliasColor(char4, teamColor2));

                //Change player names
                changeText(p1TagLayer, player1);
                changeText(p2TagLayer, player2);
                changeText(p3TagLayer, player3);
                changeText(p4TagLayer, player4);
                changeText(roundLayer, round);

                //Save photo
                saveJPG(tournament, round, player1, player2, player3, player4);

                //Reset the layers
                charlay1.visible = false;
                charlay2.visible = false;
                charlay3.visible = false;
                charlay4.visible = false;
            }
            catch(err){
                throw err;
                //errors.push(err);
            }
        }

        var ret = 'Completed \n';
        for(var i=0; i < errors.length; i++){
            errors += errors[i].message + ' \n';
        }

        alert(ret);
    } catch(e){
        alert(e);
    }
}

function importCharacterData(){
    return [{"Name":"Bowser","Colors":["Neutral","Black","Blue","Red"],"AliasColors":{}},{"Name":"Donkey Kong","Colors":["Neutral","Black","Blue","Green","Red"],"AliasColors":{}},{"Name":"Dr. Mario","Colors":["Neutral","Black","Green","Blue","Red"],"AliasColors":{}},{"Name":"Falco","Colors":["Neutral","Red","Green","Blue"],"AliasColors":{}},{"Name":"Captain Falcon","Colors":["Neutral","Red","Blue","Green","Pink","Black"],"AliasColors":{}},{"Name":"Fox","Colors":["Neutral","Green","Blue","Red"],"AliasColors":{}},{"Name":"Mr. Game and Watch","Colors":["Neutral","Blue","Green","Red"],"AliasColors":{}},{"Name":"Ganondorf","Colors":["Neutral","Blue","Purple","Green","Blue","Red"],"AliasColors":{}},{"Name":"Ice Climbers","Colors":["Neutral","Orange","Red","Green"],"AliasColors":{"Blue":"Neutral"}},{"Name":"Kirby","Colors":["Neutral","White","Blue","Green","Red","Yellow"],"AliasColors":{}},{"Name":"Link","Colors":["Neutral","White","Black","Red","Blue"],"AliasColors":{"Green":"Neutral"}},{"Name":"Luigi","Colors":["Neutral","Blue","White","Pink"],"AliasColors":{"Green":"Neutral","Red":"Pink"}},{"Name":"Mario","Colors":["Neutral","Yellow","Black","Green","Blue"],"AliasColors":{"Red":"Neutral"}},{"Name":"Marth","Colors":["Neutral","White","Black","Green","Red"],"AliasColors":{"Blue":"Neutral"}},{"Name":"MewTwo","Colors":["Neutral","Green","Blue","Yellow"],"AliasColors":{}},{"Name":"Ness","Colors":["Neutral","Green","Blue","Yellow"],"AliasColors":{"Red":"Neutral"}},{"Name":"Peach","Colors":["Neutral","Yellow","White","Green","Blue"],"AliasColors":{"Red":"Neutral"}},{"Name":"Pichu","Colors":["Neutral","Blue","Red","Green"],"AliasColors":{}},{"Name":"Pikachu","Colors":["Neutral","Green","Blue","Red"],"AliasColors":{}},{"Name":"Jigglypuff","Colors":["Neutral","Red","Yellow","Green","Blue"],"AliasColors":{}},{"Name":"Roy","Colors":["Neutral","Yellow","Red","Green","Blue"],"AliasColors":{}},{"Name":"Samus","Colors":["Neutral","Green","Purple","Black","Pink"],"AliasColors":{"Blue":"Purple","Red":"Neutral"}},{"Name":"Sheik","Colors":["Neutral","Blue","Red","Green","White"],"AliasColors":{}},{"Name":"Yoshi","Colors":["Neutral","Pink","Blue","LightBlue","Yellow","Red"],"AliasColors":{"Green":"Neutral"}},{"Name":"Young Link","Colors":["Neutral","Black","White","Blue","Red"],"AliasColors":{"Green":"Neutral"}},{"Name":"Zelda","Colors":["Neutral","White","Green","Blue","Red"],"AliasColors":{"Green":"Neutral"}}]
}

function getCharacterByName(name){
    try{
        var data = importCharacterData();
        for(var i in data){
            var character = data[i];
            if(character.Name == name)
                return character;
        }
        return undefined;
    } catch(e){
        throw new Error('getCharacterByName error: ' + e);
    }
}

function resolveAliasColor(name, color){
    try{
        var character = getCharacterByName(name);
        return character.AliasColors.hasOwnProperty(color) ? character.AliasColors[color] : color;
        //alert(c);
        //return c;
    }catch(e){
        throw new Error('resolveAlternateColor error: ' + e);
    }
}