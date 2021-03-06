export default class Sound{
    constructor(src){
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        //this.sound.volume = 0.005;
        document.body.appendChild(this.sound);
    }

    play(){
        this.sound.play();
    }

    stop(){
        this.sound.pause();
    }
}