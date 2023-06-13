import { Component, OnInit } from '@angular/core';
import { Colores } from './interfaces/colores-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'simonSays';
  simon : number[] = [];
  player : number [] = [];
  juego : boolean = false;
  puntuacion : number = 0;
  maxPuntuacion : number = 0;
  turno : boolean = true;

  delay : Function = (ms : number) : Promise<void> => {
    return  new Promise( res => setTimeout(res,ms))
  }

  colores : Colores[] = [
    {key : 0, clase : "tlSimon", sonido : "../assets/music/verde.wav"},
    {key : 1, clase : "trSimon", sonido : "../assets/music/rojo.wav"},
    {key : 2, clase : "blSimon", sonido : "../assets/music/amarillo.wav"},
    {key : 3, clase : "brSimon", sonido : "../assets/music/azul.wav"},
  ]

  ngOnInit(): void {
    console.log(localStorage.getItem("maxPuntuacion"))
    if( localStorage.getItem("maxPuntuacion") !== null){
      this.maxPuntuacion = Number(localStorage.getItem("maxPuntuacion"))
    }
  }

  async checkOrder(num : number) {
    let audio = new Audio()
    audio.src = this.colores[num].sonido;
    audio.load();
    audio.play()
    if( !this.juego ) return 
    this.player.push(num)
    for(let i = 0 ; i < this.player.length; i++){
      if( this.player[i] !== this.simon[i]) {
        this.defeated()
        return 
      }
    }
    if( this.player.length === this.simon.length){
      this.player = []
      await this.delay(1000)
      this.simonSays()
    }
  }


  async simonSays(){
    this.turno = true
    this.simon.push(Math.round(Math.random()*3))
    this.puntuacion++;
    for(let i = 0 ; i < this.simon.length ; i++){
      let color = document.getElementById(this.simon[i].toString())

      color?.classList.add(this.colores[this.simon[i]].clase)
      let audio = new Audio()
      audio.src = this.colores[this.simon[i]].sonido;
      audio.load();
      audio.play();

      await this.delay(550)
      
      color?.classList.remove(this.colores[this.simon[i]].clase)

      await this.delay(500)
    }
    this.turno = false

  }

  empezarJuego(){
    this.juego = true
    this.simonSays()
  }
  
  defeated(){
    debugger
    if ( Number(localStorage.getItem("maxPuntuacion")) < this.puntuacion ){
      localStorage.setItem("maxPuntuacion", this.puntuacion.toString())
      this.maxPuntuacion = Number(localStorage.getItem("maxPuntuacion"))
    }

    this.simon = [Math.round(Math.random()*3)]
    this.puntuacion = 0;
    this.player = []
    this.juego = false

  }

}
