'use strict';

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const request = require('request-promise');
const YouTube = require('youtube-node');
let {format} = require('util');

const ytApiUrl = 'https://www.googleapis.com/youtube/v3/videos';

async function list(){
    try{
        let url = ytApiUrl + "?part=snippet&part=id";
        let resp = await request(url);
        return resp;
    } catch(e){
        console.error(e);
        throw e;
    }
}

(async () => {
    let args = process.argv;
    let dir = args[1];
    console.log('got [%s]', dir)

    if(!path.isAbsolute(dir)){
        dir = path.resolve(dir);
        console.log('resolve dir to absolute path [%s] ', dir);
    }

    let data = []
    fs.readdirSync(dir).forEach(file => {
        let splits = file.split('-');
        
        o = {};
        o.tournament = splits[0];
        o.round = splits[3];
        o.p1 = splits[1];
        o.p2 = splits[2];
        data.push(o);
    })

    let map = {};
    let videos = await list();
    videos.forEach(video => {
        let videoData = {};
        let splits = video.title.split('-');
        let players = splits[1].split('/[\s]{1}vs[\s]{1}/');
        players = players.map( p => {
            return p.replace(/[\S\s]*\|[\s]*/, '');
        })

        videoData.tournament = splits[0];
        videoData.round = splits[2];
        videoData.player1 = players[0];
        videoData.player2 = players[1];

        data.forEach(obj => {
            
        })
    })
    
})();
