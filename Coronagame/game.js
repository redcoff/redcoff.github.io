var gameover = false;

class Game{
    constructor(score, virusElim, virusMiss){
        this.score = score;
        this.virusElim = virusElim;
        this.virusMiss = virusMiss;
    }
}

class Player{
    constructor(score, controller){
        this.score = score;
        this.controller = controller;
    }
}

class Virus{
    constructor()

    loadImage(){
        coronaImage = new Image();
        coronaImage.src = "cov.png";
    }
}

class World{
    constructor()
}

let hero = new Player();
