"use strict";

//A class to create our main character, the properties are private, but there are the get/set methods and a toString
//The character has a name, sanity points, and a song he really hates. He wants to go home
class Character {
    #name;
    #hp;
    #hatedSong;
    constructor(name, hp, hatedSong) {
        this.#name = name;
        this.#hp = hp;
        this.#hatedSong = hatedSong;
    }

    getName() {
        return this.#name;
    }

    getHp() {
        return this.#hp;
    }

    getHatedSong() {
        return this.#hatedSong;
    }

    setName(name) {
        this.#name = name;
    }

    setHp(hp) {
        this.#hp = hp;
    }

    setHatedSong(hatedSong) {
        this.#hatedSong = hatedSong;
    }

    //Display the actual state of the character
    toString() {
        let result = "";
        if (this.#hp > 1) {
            result = ` ${this.#name} has ${this.#hp} sanity points remaining.</p>`;
        } else if (this.#hp === 1){
            result = ` ${this.#name} has only one sanity point remaining.</p>`;
        } else if (this.#hp === 0){
            result = ` But ${this.#name} exploded.</p>`;
        } else {
            result = "error : already exploded</p>";
        }
        return result;
    }

}


//A class Radio, there is a playlist of several songs, and one song will be played
class Radio {
    #playlist;
    constructor (playlist) {
        this.#playlist = playlist;
    }

    getPlaylist() {
        return this.#playlist;
    }

    setPlaylist (playlist) {
        this.#playlist = playlist;
    }

    //Picks one song from the playlist
    playSong() {
        let totalSongs = this.#playlist.length;
        let songNbr = Math.floor(Math.random() * totalSongs);
        let songPlayed = this.#playlist[songNbr];

        return songPlayed;
    }

}

//A Class Path, that our character will take. The path length is determined by the nr of red lights
//There is a counter of shifts to keep the track of all the shifts on the path
class Path {
    #redLights;
    #countShift;
    constructor (redLights) {
        this.#redLights = redLights;
        this.#countShift = 0;
    }

    getRedLights() {
        return this.#redLights;
    }

    getCountShift() {
        return this.#countShift;
    }

    setRedLights(redLights) {
        this.#redLights = redLights ;
    }

    setCountShift(countShift) {
        this.#countShift = countShift;
    }

    //Keeps track of the remaining path
    toString() {
        let result = "";
        if (this.#redLights > 1) {
            result = ` There are ${this.#redLights} red lights before home.`;
        } else if (this.#redLights === 0){
            result = ` This is the last red light before home.`;
        } else if (this.#redLights === 1){
            result = ` There is one more red light before home.`;
        } else {
            result = "error : already home";
        }
        return result;

    }
}


//Our main fonction, that will use an object Character, Radio and Path
//It simulates the path that the character take to go home, but the songs can make him explode
function goHome(character, radio, path) {
    //this variable will be used for the Html output
    let outputHTML =`<p><i>Name : ${character.getName()}; Sanity Points : ${character.getHp()}; Hated Song : ${character.getHatedSong()};
         Songs in Playlist : ${radio.getPlaylist().length}; Path : ${path.getRedLights()} Red Lights;</i></p>`;

    while (character.getHp() > 0 && path.getRedLights() > 0) { //While the character is still sane and the path isn't over
        path.setRedLights(path.getRedLights()-1); //Decrementation
        let result = "";
        let songPlayed = radio.playSong();//We play a song

        if (songPlayed === character.getHatedSong()) { //If the played song is the hated one, character looses 1hp and take another taxi
            character.setHp(character.getHp()-1);
            path.setCountShift(path.getCountShift()+1);
            result = `<p>The song played is ${songPlayed} ! ${character.getName()} looses 1 sanity point.` + path.toString() + character.toString();
            outputHTML += result;
        } else { //Else everything is good and the path goes on
            result = `<p>The song played is ${songPlayed}, everything's alright !` + path.toString() + character.toString();
            outputHTML += result;
        }

        console.log(result);
    }

    //The path is over and we will use the character's sanity, the nbr of red lights and the counter of shifts to output a conclusion sentence
    let conclusion = "";
    if (character.getHp() === 0 && path.getRedLights() === 0) { //if explosion on the last red light
        conclusion = `<p><strong>${character.getName()} exploded right before home...</strong></p>`;
    } else if (character.getHp() === 0) {                       //if explosion on the way home
        conclusion = `<p><strong>${character.getName()} exploded on the way home...</strong></p>`;
    } else if (path.getRedLights() === 0) {                     //if successfuly returned home
        if (path.getCountShift() === 0) {                           
            if (character.getHp() === 1) {                          //if returned home + no shifts + 1hp
                conclusion = `<p><strong>${character.getName()} returned home with one taxi and got only one sanity point left !</strong></p>`;
            } else {                                                //if returned home + no shifts
                conclusion = `<p><strong>${character.getName()} returned home with one taxi and got ${character.getHp()} sanity points left !</strong></p>`;
            }
        } else if (path.getCountShift() === 1) {
            if (character.getHp() === 1) {                          //if returned home + 1 shifts + 1hp
                conclusion = `<p><strong>${character.getName()} returned home, but had to change taxis once and got only one sanity point left.</strong></p>`;
            } else {                                                //if returned home + 1 shifts 
                conclusion = `<p><strong>${character.getName()} returned home, but had to change taxis once and got ${character.getHp()} sanity points left.</strong></p>`;
            }
        } else {
            if (character.getHp() === 1) {                          //if returned home + 1 hp
                conclusion = `<p><strong>${character.getName()} returned home, but had to change taxis ${path.getCountShift()} times and got only one sanity point left.</strong></p>`;
            } else {                                                //if returned home 
                conclusion = `<p><strong>${character.getName()} returned home, but had to change taxis ${path.getCountShift()} times and got ${character.getHp()} sanity points left.</strong></p>`;
            }
        }  
    } else { 
        conclusion = "<p><strong>Error displaying the conclusion</strong></p>";  
    }

    console.log(conclusion);
    outputHTML += conclusion;

    //output in html
    document.getElementById("htitle").innerHTML = `${character.getName()} just wants to go home`;
    document.getElementById("content").innerHTML = outputHTML;
    
    

}

//we assign our own variables in order to test our classes and the function
let mySongs = ["Billie Jean","Anissa","Blue (Da Ba Dee)","Over the Rainbow","Never Gonna Give You Up"];
let myCharacter = new Character("John", 10, "Anissa");
let myRadio = new Radio(mySongs);
let myPath = new Path(30);


goHome(myCharacter, myRadio, myPath);

