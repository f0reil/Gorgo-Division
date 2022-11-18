export default class PauseScene extends Phaser.Scene {
	constructor(){
		super({key: 'PauseScene'})
	}
	preload(){
        this.load.image('pauseButton', 'assets/Menu/pauseButton1.png');
    }
    create(){
        this.p = this.input.keyboard.addKey('P');
        var pauseSymbol = this.add.image(310,200,'pauseButton');
        pauseSymbol.setScale(0.7, 0.7);
    }
    update()
    {
        if(this.p.isDown ){ // Comprobamos si pulsamos P
			this.scene.stop('PauseScene');
            this.scene.resume('mainLevel');
		}
    }
    
}