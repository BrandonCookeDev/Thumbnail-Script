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

var textDir = 'Logos and Text';
var leftCharactersDir = 'Characters_Left';
var rightCharactersDir = 'Characters_Right';

var errors = [];

function savePNG(tournament, round, player1, player2){
    var jpgOptions = new JPEGSaveOptions();

    var fileName = tournament + ' -' + round + '-' + player1 + "-" + player2 + ".jpg";
    var path = File(fileName);

    doc.saveAs(path, jpgOptions, true, Extension.LOWERCASE);
    name1= p1TagLayer;
    name2 = p2TagLayer;
}

function switchChar1(char1, color1){
    //if(layer.kind != LayerKind.TEXT)layer.visible = false;
    var charFolder = doc.layerSets.getByName(leftCharactersDir);
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
}

function switchChar2(char2, color2){
    //if(layer.kind != LayerKind.TEXT)layer.visible = false;
    var charFolder = doc.layerSets.getByName(rightCharactersDir);
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
}

function changeText(layerName, newText){
    var layerSetRef = doc.layerSets.getByName(textDir);
    var text = layerSetRef.layers.getByName(layerName);
    if(text.kind == LayerKind.TEXT) text.textItem.contents = newText;
    text.visible = true;
    if(layerName == p1TagLayer)
        name1 = text;
    else
        name2 = text;
}

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

//CSV
var csvFile = File.openDialog("Open Comma-delimited File","comma-delimited(*.csv):*.csv;");
csvFile.open('r') ;
var csvString = csvFile.read();
csvFile.close();
csvString = csvString.split('\n');

//VALIDATE COLORS FOR CHARACTERS
for(var s = 1; s<csvString.length; s++){
	var lineData = csvString[s].split(",");

	var char1 = lineData[3];
	var color1 = lineData[4];

	var char2 = lineData[6];
	var color2 = lineData[7];

	//VALIDATE COLORS AND FAIL IF INCORRECT
	validate(char1, color1);
	validate(char2, color2);
}
	

//Parses entire CSV
for(var s = 1; s<csvString.length; s++){
    try{
        var lineData = csvString[s].split(",");

        //Process each line of data.
        var tournament = lineData[0];
        var round = lineData[1];

        var player1 = lineData[2];
        var char1 = lineData[3];
        var color1 = lineData[4];

        var player2 = lineData[5];
        var char2 = lineData[6];
        var color2 = lineData[7];

        //Switch Characters
        switchChar1(char1, color1);
        switchChar2(char2, color2);

        //Change player names
        changeText(p1TagLayer, player1);
        changeText(p2TagLayer, player2);
        changeText(roundLayer, round);

        //Save photo
        savePNG(tournament, round, player1, player2);

        //Reset the layers
        charlay1.visible = false;
        charlay2.visible = false;
    }
    catch(err){
        errors.push(err);
    }
}

var ret = 'Completed \n';
for(var i=0; i < errors.length; i++){
    errors += errors[i].message + ' \n';
}

alert(ret);


function importCharacterData(){
	return [{Name:"Bowser",Colors:["Neutral","Black","Blue","Red"]},{Name:"Donkey Kong",Colors:["Neutral","Black","Blue","Green","Red"]},{Name:"Dr. Mario",Colors:["Neutral","Black","Green","Blue","Red"]},{Name:"Falco",Colors:["Neutral","Red","Green","Blue"]},{Name:"Captain Falcon",Colors:["Neutral","Red","Blue","Green","Pink","Black"]},{Name:"Fox",Colors:["Neutral","Green","Blue","Red"]},{Name:"Mr. Game and Watch",Colors:["Neutral","Blue","Green","Red"]},{Name:"Ganondorf",Colors:["Neutral","Blue","Purple","Green","Blue","Red"]},{Name:"Ice Climbers",Colors:["Neutral","Orange","Red","Green"]},{Name:"Kirby",Colors:["Neutral","White","Blue","Green","Red","Yellow"]},{Name:"Link",Colors:["Neutral","White","Black","Red","Blue"]},{Name:"Luigi",Colors:["Neutral","Blue","White","Pink"]},{Name:"Mario",Colors:["Neutral","Yellow","Black","Green","Blue"]},{Name:"Marth",Colors:["Neutral","White","Black","Green","Red"]},{Name:"MewTwo",Colors:["Neutral","Green","Blue","Yellow"]},{Name:"Ness",Colors:["Neutral","Green","Blue","Yellow"]},{Name:"Peach",Colors:["Neutral","Yellow","White","Green","Blue"]},{Name:"Pichu",Colors:["Neutral","Blue","Red","Green"]},{Name:"Pikachu",Colors:["Neutral","Green","Blue","Red"]},{Name:"Jigglypuff",Colors:["Neutral","Red","Yellow","Green","Blue"]},{Name:"Roy",Colors:["Neutral","Yellow","Red","Green","Blue"]},{Name:"Samus",Colors:["Neutral","Green","Purple","Black","Pink"]},{Name:"Sheik",Colors:["Neutral","Blue","Red","Green","White"]},{Name:"Yoshi",Colors:["Neutral","Pink","Blue","LightBlue","Yellow","Red"]},{Name:"Young Link",Colors:["Neutral","Black","White","Blue","Red"]},{Name:"Zelda",Colors:["Neutral","White","Green","Blue","Red"]}];
}