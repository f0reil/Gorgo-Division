
/**
 * Escena principal de juego.
 * @extends Phaser.Scene
 */

export default class YouDied extends Phaser.Scene {
	constructor(){
		super({key: 'YouDied'})
	}
	preload(){
        this.load.image('youDied', 'assets/Menu/youDied.jpg');
    }
    create(){
        var fondo = this.add.image(310,200,'youDied');
    }
    
}