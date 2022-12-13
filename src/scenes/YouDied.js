
export default class YouDied extends Phaser.Scene {
	constructor(){
		super({key: 'YouDied'})
	}
	preload(){

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
            restartButton.setVisible(true);
            self.scene.launch('Level1');
            self.scene.stop('YouDied');
        });
    }
    
}