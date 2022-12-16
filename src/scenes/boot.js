export default class boot extends Phaser.Scene{
    constructor(){
		super({key: 'boot'})
	}
	preload(){
        //Carga los assets de las demás escenas
        this.load.image("key", "assets/Items/Doors/Key.png");
        this.load.image("door", "assets/Items/Doors/Door.png");
        this.load.image('player', 'assets/Hero/player.png');
        this.load.image('statue', 'assets/Enemies/statue.png');
        this.load.image('medusa', 'assets/Enemies/medusa2.png');
        this.load.image('pauseButton', 'assets/Menu/pauseButton.png');
        this.load.image('mask', 'assets/Hero/mask1.png');
        this.load.image('maskH', 'assets/Hero/mask2.png');
        this.load.image('cone', 'assets/Hero/cone.png');
        this.load.image('circle', 'assets/Hero/TorchMask.png');
        this.load.image('help1', 'assets/UI/help1.png');
        this.load.image('help2', 'assets/UI/help2.png');
        this.load.image('help3', 'assets/UI/help3.png');
        this.load.image('help4', 'assets/UI/help4.png');
        this.load.image("backgroundIntro", "assets/Menu/Introduction.png");

        this.load.image("fire", "assets/Items/Torch/torch_1.png");
        this.load.image("bordeBarra","assets/UI/bordeBarra.png");
        this.load.image("barra", "assets/UI/barra.png");
        this.load.image('floor', 'assets/maps/floor.png');

        // Imagen power up de tiempo
        this.load.image('timePowerUp', 'assets/Items/PowerUp/PowerUpTiempo.png');
        this.load.image('velocityPowerUp', 'assets/Items/PowerUp/PowerUpVelocidad.png')

         //Imagénes trampas
         this.load.image('wind1', 'assets/Items/Traps/wind11.png');
         this.load.image('wind2', 'assets/Items/Traps/wind22.png');
         this.load.image('wind3', 'assets/Items/Traps/wind33.png');
         this.load.image('wind4', 'assets/Items/Traps/wind44.png');
         this.load.image('wind5', 'assets/Items/Traps/wind55.png');
         this.load.image('deadlyTrap', 'assets/maps/Catacombs/spike_1.png');

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
        this.load.audio('torchEndSound', 'assets/Audio/TorchEnd.mp3')
        this.load.audio('enemyMoving', 'assets/Audio/StoneMoving.mp3')
        this.load.audio('walkSound', 'assets/Audio/WalkEffect.mp3')
        this.load.audio('snakeSound', 'assets/Audio/Snake.mp3')
        this.load.audio('victory', 'assets/Audio/Victory.mp3')
        this.load.audio('tutorialTheme', 'assets/Audio/TutorialTheme.mp3')
        this.load.audio('spikeTrap', 'assets/Audio/Spike.mp3')
        

        //Imagenes menus
        this.load.image('youWin', 'assets/Menu/youWin.jpg');
        this.load.image('backToMenuButton', 'assets/Menu/MenuButton.png');
        this.load.image('CreditsButton', 'assets/Menu/CreditsButton.png');
        this.load.image('ControlsButton', 'assets/Menu/ControlsButton.png');
        this.load.image('youDied', 'assets/Menu/youDied.jpg');
        this.load.image('restartButton', 'assets/Menu/restartButton.png');
        this.load.image('restartButton2', 'assets/Menu/restartButton2.png');
        this.load.image('startMenu', 'assets/Menu/MenuImage.jpg');
        this.load.image('startButton', 'assets/Menu/startButton.png');
        this.load.image('startButton2', 'assets/Menu/startButton2.png');
        this.load.image('pauseButton1', 'assets/Menu/pauseButton1.png');
        this.load.image('resumeButton', 'assets/Menu/resumeButton.png');
        this.load.image('resumeButton2', 'assets/Menu/resumeButton2.png');
        this.load.image('allControls', 'assets/Menu/allControls.png');
        this.load.image('creditos', 'assets/Menu/creditos.png');
        // Imagenes antorcha de la barra
        this.load.path = 'assets/Items/Torch/';

        this.load.image('torch1', 'torch_1.png');
        this.load.image('torch2', 'torch_2.png');
        this.load.image('torch3', 'torch_3.png');
        this.load.image('torch4', 'torch_4.png');
    }
    create(){
        this.scene.launch('IntroScene');
    }
}