export default class Controls extends Phaser.Scene {

	constructor(){
		super({key: 'Credit'})
	}
	preload(){
        
    }
    create(){
        let self = this;
        this.p = this.input.m;
        this.fondo = this.add.sprite(310,200,'creditos').setInteractive(); 
        this.fondo.on('pointerup', function(pointer)
        {
            self.scene.stop(self);
            self.scene.launch('StartMenu');
        });
    }


}