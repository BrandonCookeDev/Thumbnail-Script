#target photoshop

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

var textDir             = 'Logos and Text';
var leftCharactersDir   = 'Characters_Left';
var leftCharactersP2Dir = 'Characters_Left_P2';
var rightCharactersDir  = 'Characters_Right';
var rightCharactersP2Dir  = 'Characters_Right_P2';

var errors = [];

function savePNG(tournament, round, player1, player2, player3, player4){
    var jpgOptions = new JPEGSaveOptions();

    var fileName = tournament + 'Doubles-' + round + '-' + player1 + player2 + "-" + player3 + player4 + ".jpg";
    var path = File(fileName);

    doc.saveAs(path, jpgOptions, true, Extension.LOWERCASE);
    name1 = p1TagLayer;
    name2 = p2TagLayer;
    name3 = p3TagLayer;
    name4 = p4TagLayer;
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
}

function switchChar3(char3, color3){
    //if(layer.kind != LayerKind.TEXT)layer.visible = false;
    var charFolder = doc.layerSets.getByName(rightCharactersDir);
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
}

function switchChar4(char4, color4){
    //if(layer.kind != LayerKind.TEXT)layer.visible = false;
    var charFolder = doc.layerSets.getByName(rightCharactersP2Dir);
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
}

function changeText(layerName, newText){
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
}

//CSV
var csvFile = File.openDialog("Open Comma-delimited File","comma-delimited(*.csv):*.csv;");
csvFile.open('r') ;
var csvString = csvFile.read();
csvFile.close();
csvString = csvString.split('\n');

//Parses entire CSV
for(var s = 1; s<csvString.length; s++){
    try {
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

        var player3 = lineData[8];
        var char3 = lineData[9];
        var color3 = lineData[10];

        var player4 = lineData[11];
        var char4 = lineData[12];
        var color4 = lineData[13];

        //Switch Characters
        switchChar1(char1, color1);
        switchChar2(char2, color2);
        switchChar3(char3, color3);
        switchChar4(char4, color4);

        //Change player names
        changeText(p1TagLayer, player1);
        changeText(p2TagLayer, player2);
        changeText(p3TagLayer, player3);
        changeText(p4TagLayer, player4);
        changeText(roundLayer, round);

        //Save photo
        savePNG(tournament, round, player1, player2, player3, player4);

        //Reset the layers
        charlay1.visible = false;
        charlay2.visible = false;
        charlay3.visible = false;
        charlay4.visible = false;
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