#target photoshop

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

function savePNG(tournament, round, player1, player2){
    var pngOptions = new PNGSaveOptions();

    var fileName = tournament + ' -' + round + '-' + player1 + "-" + player2 + ".png";
    var path = File(fileName);

    doc.saveAs(path, pngOptions, true, Extension.LOWERCASE);
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

//CSV
var csvFile = File.openDialog("Open Comma-delimited File","comma-delimited(*.csv):*.csv;");
csvFile.open('r') ;
var csvString = csvFile.read();
csvFile.close();
csvString = csvString.split('\n');

//Parses entire CSV
for(var s = 1; s<csvString.length; s++){
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
    switchChar1(char1,color1);
    switchChar2(char2,color2);

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


alert("Completed");