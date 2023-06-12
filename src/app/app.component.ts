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
  

  colores : Colores[] = [
    {key : 0, clase : "tlSimon"},
    {key : 1, clase : "trSimon"},
    {key : 2, clase : "blSimon"},
    {key : 3, clase : "brSimon"},
  ]

  ngOnInit(): void {
    this.simon.push(Math.round(Math.random()*3))

  }

  checkOrder(num : number) : void {
    //TODO comprobar el orden de el array del jugador con el de simon, for itinerado de jugador comprobar 
    this.player.push(num)
    for(let i = 0 ; i < this.player.length; i++){
      if( this.player[i] !== this.simon[i]) {
        this.defeated()
        return
      }
    }
    if( this.player.length === this.simon.length){
      this.player = []
      this.simonSays()
    }

  }


  async simonSays(){
    debugger
    this.simon.push(Math.round(Math.random()*3))
    const delay =  (ms : number) =>  new Promise(res => setTimeout(res, ms));
    for(let i = 0 ; i < this.simon.length ; i++){
      let color = document.getElementById(this.simon[i].toString())

      color?.classList.add(this.colores[this.simon[i]].clase)
      
      await delay(500)
      
      color?.classList.remove(this.colores[this.simon[i]].clase)

      await delay(1000)
    }
  }

  empezarJuego(){
    this.juego = true
    this.simonSays()
  }
  
  defeated(){
    this.simon = [Math.round(Math.random()*3)]
    this.player = []
    this.juego = false

  }

}
