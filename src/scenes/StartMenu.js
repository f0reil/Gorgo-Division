
 export default class StartMenu extends Phaser.Scene {
	constructor(){
		super({key: 'StartMenu'})
	}
	preload(){
        this.load.image('startMenu', 'assets/Menu/startMenu.jpg');
        this.load.image('startButton', 'assets/Menu/startButton.png');
        this.load.image('startButton2', 'assets/Menu/startButton2.png');

        this.load.audio('menuSong', 'assets/Audio/MenuTheme2.mp3')
    }
    create(){
        var fondo = this.add.image(310,200,'startMenu');
        var startButton2 = this.add.sprite(490, 70, 'startButton2').setInteractive();
        var startButton = this.add.sprite(490, 70, 'startButton').setInteractive();
        fondo.setScale(1.2, 1.2);
        startButton2.setScale(0.3, 0.3);
        startButton.setScale(0.3, 0.3);

        
        
        let self = this;
        startButton.on('pointerdown', function(pointer)
        {
            startButton.setVisible(false);
        });

        startButton2.on('pointerup', function(pointer)
        {
            startButton.setVisible(true);
            self.scene.launch('Level1');
            self.scene.stop('StartMenu');
            mainTheme.stop();
        });

        const config = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        };
        var mainTheme = this.sound.add("menuSong", config);
        mainTheme.play();
    }
    
}