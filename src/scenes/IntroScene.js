
/**
 * Escena de presentación del grupo
 * @extends Phaser.Scene
 */
export default class IntroScene extends Phaser.Scene {

	constructor(){
		super({key: 'IntroScene'})
	}
	preload(){
        
    }
    create(){
        var escena = this;
        var fondo = this.add.image(310,200,'backgroundIntro'); //Añade el logo del equipo
        fondo.alpha =0;
        this.tweens.add({ //Tween para el efecto de aparición y desaparición
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
