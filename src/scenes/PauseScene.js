export default class PauseScene extends Phaser.Scene {
	constructor(){
		super({key: 'PauseScene'})
	}
	preload(){
        this.load.image('pauseButton1', 'assets/Menu/pauseButton1.png');
        this.load.image('resumeButton', 'assets/Menu/resumeButton.png');
        this.load.image('resumeButton2', 'assets/Menu/resumeButton2.png');
    }
    create(){
        this.p = this.input.keyboard.addKey('P');
        var pauseSymbol = this.add.image(300,200,'pauseButton1');
        var resumeButton2 = this.add.sprite(300, 400, 'resumeButton2').setInteractive();
        var resumeButton = this.add.sprite(300, 400, 'resumeButton').setInteractive();
        pauseSymbol.setScale(0.6, 0.6);
        resumeButton2.setScale(0.3, 0.3);
        resumeButton.setScale(0.3, 0.3);

        let self = this;
        resumeButton.on('pointerdown', function(pointer)
        {
            resumeButton.setVisible(false);
        });

        resumeButton2.on('pointerup', function(pointer)
        {
            resumeButton.setVisible(true);
            self.scene.stop('PauseScene');
            self.scene.resume('mainLevel');
            self.scene.resume('Level1');
            self.scene.resume('Level2');
            self.scene.resume('Level3');
            self.scene.resume('Level4');
        });
    }
    update()
    {
        if(this.p.isDown ){ // Comprobamos si pulsamos P
			this.scene.stop('PauseScene');
            this.scene.resume('mainLevel');
            self.scene.resume('Level1');
            self.scene.resume('Level2');
            self.scene.resume('Level3');
            self.scene.resume('Level4');
		}
    }
    
}