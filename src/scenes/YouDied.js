
export default class YouDied extends Phaser.Scene {
	constructor(){
		super({key: 'YouDied'})
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

        let self = this;
        restartButton.on('pointerdown', function(pointer)
        {
            restartButton.setVisible(false);
        });

        restartButton2.on('pointerup', function(pointer)
        {
            console.log("lol");
            restartButton.setVisible(true);
            self.scene.launch('mainLevel');
            self.scene.stop('YouDied');
        });
    }
    
}