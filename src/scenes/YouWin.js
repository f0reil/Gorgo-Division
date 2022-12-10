
export default class YouWin extends Phaser.Scene {
	constructor(){
		super({key: 'YouWin'})
	}
	preload(){
        this.load.image('youWin', 'assets/Menu/youWin.jpg');
        this.load.image('restartButton', 'assets/Menu/restartButton.png');
        this.load.image('restartButton2', 'assets/Menu/restartButton2.png');
    }
    create(){
        var fondo = this.add.image(310,200,'youWin');
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
            self.scene.launch('StartMenu');
            self.scene.stop('YouWin');
        });
        //Audio del nivel
        const config = {
            mute: false,
            volume: 0.3,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
        };
        var levelTheme = this.sound.add("victory", config);
        levelTheme.play();
    }
    
}