import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simonSays';
  simon : number[] = [];
  player : number [] = [];
  juego : boolean = false;

  checkOrder(num : number){


  }


  simonSays(){
    this.simon.push(Math.round(Math.random()*3))
    for(let i = 0 ; i < this.simon.length ; i++){
      let color = document.getElementById(this.simon[i].toString())
      setTimeout( () => {
        

      }, 1000)
    }
  }

  empezarJuego(){
    this.juego = true
    
  }
  
  
}
