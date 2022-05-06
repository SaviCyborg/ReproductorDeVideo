window.onload=inicio;

var videos = ['cires1.mp4','cires2.mp4','cires3.mp4','cires4.mp4','cires5.mp4',
            'cires6.mp4','cires7.mp4','cires8.mp4'];

var vid;
var speed=2;
var orden = [];
var videoActual=0;
function inicio(){
    vid=document.querySelector("video");
    vid.onclick=play;
    vid.src=`videos/${videos[videoActual]}`;
    document.querySelector(".play").onclick=play;
    document.querySelector(".volumen").onclick=volumen;
    document.querySelector(".siguiente").onclick=siguiente;
    document.querySelector(".reiniciar").onclick=reiniciar;
    document.querySelector(".reducir").onclick=reducir;
    document.querySelector(".barra1").onclick=buscar;
    document.querySelector(".velocidad").onclick=velocidad;
    reordenar(); 
    vid.ontimeupdate=actualizar;
    vid.onloadeddata=actualizar;
    vid.onended=siguiente;
}

function play(){
    if(vid.paused){
        vid.play();
        document.querySelector(".play").src="img/pausa.svg";
    }else{
        vid.pause();
        document.querySelector(".play").src="img/play.svg";
    }

}

function volumen(){
    vid.volume = !vid.volume;
    this.src = `img/volumen${vid.volume}.svg`

}

function reordenar(){
    for(v of videos){
        do{
            var azar=Math.floor(Math.random() * videos.length);
        }while(orden.indexOf(azar)>=0)
        orden.push(azar);
    }
    reproducir();

}

function reproducir(){
    let videoToca=orden[videoActual];
    vid.src=`videos/${videos[videoToca]}`;
    vid.play();

}

function siguiente(){
    videoActual++;
    if(videoActual>=videos.length){
        videoActual=0;
    }
    reproducir();

}

function reiniciar(){
    vid.currentTime=0;
}

function reducir(){
    let s=document.querySelector("section");
    if(s.style.transform=="scale(0.5)"){
        s.style.transform="scale(1)";
        document.querySelector(".reducir").src="img/reducir.svg";
    }else{
        s.style.transform="scale(0.5)";
        document.querySelector(".reducir").src="img/ampliar.svg";
    }
}

function actualizar(){
    document.querySelector(".estado").innerHTML=`${conversion(vid.currentTime)}/${conversion(vid.duration)}`;
    let porcentaje= (100*vid.currentTime)/vid.duration;
    document.querySelector(".barra2").style.width=`${porcentaje}%`;
}

function conversion(segundos){
    let d=new Date(segundos*1000);
    let segundo=(d.getSeconds()<=9) ? "0"+d.getSeconds() : d.getSeconds();
    let minuto=(d.getMinutes()<=9) ? "0"+d.getMinutes() : d.getMinutes();
    return `${minuto}:${segundo}`;


}

function buscar(e){
    let dondeHeHechoClick=e.offsetX;
    let anchoNavegador=document.querySelector(".barra1").offsetWidth;
    let porcentaje=(100*dondeHeHechoClick)/anchoNavegador;
    let posicion=Math.floor(vid.duration*(porcentaje/100));
    vid.currentTime=posicion;
}

function velocidad(){
    let estados=[0.2,0.5,1,2,15];
    speed++;
    if(speed>=estados.length){
        speed=0;
    }
    vid.playbackRate=estados[speed];

}
