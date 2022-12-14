
 export default class StartMenu extends Phaser.Scene {
	constructor(){
		super({key: 'StartMenu'})
	}
	preload(){
        //Carga los assets de las demás escenas
        this.load.image("key", "assets/Items/Doors/Key.png");
        this.load.image("door", "assets/Items/Doors/Door.png");
        this.load.image('player', 'assets/Hero/player.png');
        this.load.image('statue', 'assets/Enemies/statue.png');
        this.load.image('medusa', 'assets/Enemies/medusa.png');
        this.load.image('pauseButton', 'assets/Menu/pauseButton.png');
        this.load.image('mask', 'assets/Hero/mask1.png');
        this.load.image('maskH', 'assets/Hero/mask2.png');
        this.load.image('cone', 'assets/Hero/cone.png');
        this.load.image('circle', 'assets/Hero/TorchMask.png');
        this.load.image('help1', 'assets/UI/help1.png');
        this.load.image('help2', 'assets/UI/help2.png');
        this.load.image('help3', 'assets/UI/help3.png');

        this.load.image("fire", "assets/Items/Torch/torch_1.png");
        this.load.image("bordeBarra","assets/UI/bordeBarra.png");
        this.load.image("barra", "assets/UI/barra.png");
        this.load.image('floor', 'assets/maps/floor.png');

        // Imagen power up de tiempo
        this.load.image('timePowerUp', 'assets/Items/PowerUp/PowerUpTiempo.png');
        this.load.image('velocityPowerUp', 'assets/Items/PowerUp/PowerUpVelocidad.png')

        this.load.image('block', 'assets/Items/Block/block.png');
        this.load.image('gem', 'assets/Items/Block/gem.png');

        this.load.image('tiles', 'assets/maps/Catacombs/mainlevbuild.png')
        this.load.image('tilesCave', 'assets/maps/Cave/MainLev2.0.png')
		this.load.tilemapTiledJSON('tilemap', 'assets/maps/Level01.json')
        this.load.tilemapTiledJSON('tilemap2', 'assets/maps/Level02.json')
        this.load.tilemapTiledJSON('tilemap3', 'assets/maps/Level03.json') 
        this.load.tilemapTiledJSON('tilemap4', 'assets/maps/Level04.json') 
        
        //Audio
        this.load.audio('menuSong', 'assets/Audio/MenuTheme2.mp3')
        this.load.audio('levelSong', 'assets/Audio/AmbientSound.mp3')
        this.load.audio('torchEndSound', 'assets/Audio/torchEnd.mp3')
        this.load.audio('enemyMoving', 'assets/Audio/StoneMoving.mp3')
        this.load.audio('walkSound', 'assets/Audio/WalkEffect.mp3')
        this.load.audio('snakeSound', 'assets/Audio/Snake.mp3')
        this.load.audio('victory', 'assets/Audio/Victory.mp3')

        //Imagenes menus
        this.load.image('youWin', 'assets/Menu/youWin.jpg');
        this.load.image('backToMenuButton', 'assets/Menu/MenuButton.png');
        this.load.image('CreditsButton', 'assets/Menu/CreditsButton.png');
        this.load.image('ControlsButton', 'assets/Menu/ControlsButton.png');
        this.load.image('youDied', 'assets/Menu/youDied.jpg');
        this.load.image('restartButton', 'assets/Menu/restartButton.png');
        this.load.image('restartButton2', 'assets/Menu/restartButton2.png');
        this.load.image('startMenu', 'assets/Menu/startMenu.jpg');
        this.load.image('startButton', 'assets/Menu/startButton.png');
        this.load.image('startButton2', 'assets/Menu/startButton2.png');
        // Imagenes antorcha de la barra
        this.load.path = 'assets/Items/Torch/';

        this.load.image('torch1', 'torch_1.png');
        this.load.image('torch2', 'torch_2.png');
        this.load.image('torch3', 'torch_3.png');
        this.load.image('torch4', 'torch_4.png');
    }
    create(){
        var fondo = this.add.image(310,200,'startMenu');
        var startButton2 = this.add.sprite(490, 70, 'startButton2').setInteractive();
        var startButton = this.add.sprite(490, 70, 'startButton').setInteractive();
        var controlsButton = this.add.sprite(490, 170, 'ControlsButton').setInteractive();
        var creditsButton = this.add.sprite(490, 270, 'CreditsButton').setInteractive();
        fondo.setScale(1.2, 1.2);
        startButton2.setScale(0.3, 0.3);
        startButton.setScale(0.3, 0.3);
        controlsButton.setScale(0.3, 0.3);
        creditsButton.setScale(0.3, 0.3);
        
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