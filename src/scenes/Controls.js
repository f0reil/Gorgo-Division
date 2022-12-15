export default class Controls extends Phaser.Scene {

	constructor(){
		super({key: 'Controls'})
	}
	preload(){
        
    }
    create(){
        let self = this;
        this.p = this.input.m;
        this.fondo = this.add.sprite(310,200,'allControls').setInteractive(); 
        this.fondo.setScale(1.2, 1.2);
        this.fondo.on('pointerup', function(pointer)
        {
            self.scene.stop(self);
            self.scene.launch('StartMenu');
        });
    }


}