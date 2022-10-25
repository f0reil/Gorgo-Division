
import Player from '../characters/Player.js'
export default class mainLevel extends Phaser.Scene {
	constructor(){
		super({key: 'mainLevel'})
	}

	preload(){
		// Cargamos el Spritesheet										//idicamos el alto y alto de todas las imágenes dentro del Spritesheet
		//this.load.spritesheet('knight', 'assets/Knight/knight.png', {frameWidth: 72, frameHeight:86});

		// Cargamos el Atlas (el atlas está compuesto por un archivo de imagen y un JSON que describe lo que contiene)
		this.load.atlas('seaAnimals', 'assets/Sea/seacreatures.png', 'assets/Sea/seacreatures.json')
		this.load.image('player', 'assets/Hero/player.png');
	}

	create(){
		new Player(this, 300, 150);

	}

	update(){

	}

}