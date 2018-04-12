import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DatabaseService } from '../database.service';
import { ColorPref } from '../models/colorpref.model';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { FormsModule } from '@angular/forms';
import { CreateBubble } from '../models/bubbles.model';
import { MobileComponent } from '../mobile/mobile.component'
declare var p5: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers : [DatabaseService]

})

export class PlayerComponent implements OnInit {
  partyTime: any;
  colorSchemes: any[];
  bubble: boolean;
  song;
  amplitude;
  effect1;
  effect2;

constructor(public databaseService: DatabaseService) { }

  ngOnInit() {
    this.setupForEffectOne();
    this.databaseService.getColors().subscribe(data => {
    this.colorSchemes = data;
    });
    this.partyTime()
      .then(alert("hello"))

  }

  colors(name: string, color1: string, color2: string, color3: string, color4: string) {
    this.databaseService.addColors(new ColorPref(name, color1, color2, color3, color4));

    this.databaseService.getColors().subscribe(data => {
     this.colorSchemes = data;
   });
  }

  // chooseColor() {
  //   this.databaseService.colorDatabase();
  // }

  setupForEffectOne() {
    let propertyFunction = (p) => {

      p.setup = () => {
        var cnv = p.createCanvas(p.windowWidth, p.windowHeight);
        cnv.position(100, 100);
        var x = (p.windowWidth - p.width) / 2;
        var y = (p.windowHeight - p.height) / 2;
        cnv.position(x, y);
        p.background('rgba(0,0,0,0)');

        p.clear();
        // const canvasWidth = 1000;
        const canvasHeight = p.windowHeight;
        const canvasWidth = p.windowWidth;
        // p.windowHeight;
        this.effect1 = p.createCanvas(canvasWidth, canvasHeight);
        this.song = p.loadSound('../assets/cool-song.mp3', p.loaded);
        this.amplitude = new p5.Amplitude();
        p.frameRate(30);
      };

      p.draw = () => {
        p.background(0);

        let songVol = this.amplitude.getLevel();

        p.fill(255);
        p.stroke(255);
        p.ellipse(p.width / 1.2, p.height / 3, 500 * songVol, 500 * songVol); //swap micVol and songVol to show vis of different inputs

        p.fill(0);
        p.ellipse(p.width / 1.2, p.height / 3, 200 * songVol, 200 * songVol); //swap micVol and songVol to show vis of different inputs
        p.fill('rgba(0,0,0,0)');
        p.stroke(255, 0, 0);
        p.ellipse(p.width / 1.2, p.height / 3, 100 / songVol, 100 / songVol); //swap micVol and songVol to show vis of different inputs

        p.fill(255);
        p.stroke(255);
        p.ellipse(p.width/5, p.height / 3, 500 * songVol, 500 * songVol); //swap micVol and songVol to show vis of different inputs

        p.fill(0);
        p.ellipse(p.width/5, p.height / 3, 200 * songVol, 200 * songVol); //swap micVol and songVol to show vis of different inputs
        p.fill('rgba(0,0,0,0)');
        p.stroke("#FFD700");
        p.ellipse(p.width/5, p.height / 3, 100 / songVol, 100 / songVol); //swap micVol and songVol to show vis of different inputs
      }

      p.loaded = () => {
        console.log("song loaded");
        console.log(this.song);
        // this.song.play(); //to play song once song is loaded.
      };

    }
    this.instantiateP5(propertyFunction);
  }

  setupForEffectTwo() {
    let propertyFunction = (p) => {
      p.setup = () => {
        p.clear();
        // const canvasWidth = 800; //p.windowWidth;
        // const canvasHeight = 500; //p.windowHeight;
        this.effect1 = p.createCanvas(p.windowWidth, p.windowHeight);
        this.amplitude = new p5.Amplitude();
        p.frameRate(60);
      };

      p.draw = () => {
        p.background(0);

        let songVol = this.amplitude.getLevel();

        p.fill(255);
        p.stroke(255);
        p.ellipse(p.width / 2, p.height, 500 * songVol, 100 * songVol); //swap micVol and songVol to show vis of different inputs

        p.fill(0);
        p.ellipse(p.width / 2, p.height, 200 * songVol, 50 * songVol); //swap micVol and songVol to show vis of different inputs
        p.fill('rgba(0,0,0,0)');
        p.stroke(255, 0, 0);
        p.ellipse(p.width / 2, p.height, 100 / songVol, 50 / songVol); //swap micVol and songVol to show vis of different inputs
      };
    };
    this.instantiateP5(propertyFunction);
  }

  instantiateP5(s) {
    let player = new p5(s);
  }

  playCurrentSong() {
    if ( this.song.isPlaying() ) {
      this.song.pause();
    } else {
      this.song.play();
    }
  }

}
