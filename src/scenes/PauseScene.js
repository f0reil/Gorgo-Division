export default class PauseScene extends Phaser.Scene {
	constructor(){
		super({key: 'PauseScene'})
        this.levelScene = 'Level1';
	}
	preload(){

    }
    create(){
        this.p = this.input.keyboard.addKey('P'); 
        var pauseSymbol = this.add.image(300,150,'pauseButton1'); //Imagen de pausa
        var resumeButton2 = this.add.sprite(300, 300, 'resumeButton2').setInteractive(); //Botón de pausa
        var resumeButton = this.add.sprite(300, 300, 'resumeButton').setInteractive();
        var restartButton = this.add.sprite(300, 400, 'backToMenuButton').setInteractive();
        restartButton.setScale(0.3, 0.3);

        restartButton.on('pointerup', function(pointer)
        {
            self.scene.stop('PauseScene');
            self.scene.stop('HUD');
            self.scene.stop(self.levelScene);
            self.sys.game.sound.stopAll();
            self.scene.launch('StartMenu');
        });
        pauseSymbol.setScale(0.6, 0.6);
        resumeButton2.setScale(0.3, 0.3);
        resumeButton.setScale(0.3, 0.3);

        let self = this;
        resumeButton.on('pointerdown', function(pointer)
        {
            resumeButton.setVisible(false);
        });

        resumeButton2.on('pointerup', function(pointer) //En caso de pulsar el botón, se reanuda la partida
        {
            resumeButton.setVisible(true);
            self.scene.stop('PauseScene');
            self.scene.resume('HUD');
            self.scene.resume(self.levelScene);
        });
    }
    update()
    {
        if(this.p.isDown ){ // Comprobamos si pulsamos P para reanudar el juego
			this.scene.stop('PauseScene');
            this.scene.resume('mainLevel');
            this.scene.resume('HUD');
            this.scene.resume('Level1');
            this.scene.resume('Level2');
            this.scene.resume('Level3');
            this.scene.resume('Level4');
		}
    }
    
}