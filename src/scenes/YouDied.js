
export default class YouDied extends Phaser.Scene {
	constructor(){
		super({key: 'YouDied'})
        this.levelScene = 'Level1';
	}
	preload(){
        this.load.image('youDied', 'assets/Menu/youDied.jpg');
        this.load.image('restartButton', 'assets/Menu/restartButton.png');
        this.load.image('restartButton2', 'assets/Menu/restartButton2.png');
    }
    create(){
        var fondo = this.add.image(310,200,'youDied');
        var restartButton2 = this.add.sprite(300, 350, 'restartButton2').setInteractive();
        var restartButton = this.add.sprite(300, 350, 'restartButton').setInteractive();
        restartButton2.setScale(0.3, 0.3);
        restartButton.setScale(0.3, 0.3);
        this.scene.stop('HUD');

        let self = this;
        restartButton.on('pointerdown', function(pointer)
        {
            restartButton.setVisible(false);
        });

        restartButton2.on('pointerup', function(pointer)
        {
            restartButton.setVisible(true);
            self.scene.launch(self.levelScene);
            self.scene.stop('YouDied');
        });
    }
    
}