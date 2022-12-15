
export default class YouWin extends Phaser.Scene {
	constructor(){
		super({key: 'YouWin'})
	}
	preload(){

    }
    create(){
        var fondo = this.add.image(310,200,'youWin');
        var restartButton = this.add.sprite(300, 350, 'backToMenuButton').setInteractive();
        restartButton.setScale(0.3, 0.3);

        let self = this;
        restartButton.on('pointerup', function(pointer)
        {
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