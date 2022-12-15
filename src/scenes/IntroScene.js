
/**
 * Escena principal de juego.
 * @extends Phaser.Scene
 */
export default class IntroScene extends Phaser.Scene {

	constructor(){
		super({key: 'IntroScene'})
	}
	preload(){
        this.load.image("backgroundIntro", "assets/Menu/Introduction.png");
    }
    create(){
        var escena = this;
        var fondo = this.add.image(310,200,'backgroundIntro');
        fondo.alpha =0;
        this.tweens.add({
            targets: fondo,
            alpha: 1,
            duration: 2000,
            ease: 'Sine.easeInOut',
            loop: 0,
            yoyo: true,
            onComplete: function () { escena.scene.launch('StartMenu'); },
        });
    }

}
