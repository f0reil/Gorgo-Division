
import Player from '../characters/Player.js'
import Door from '../gameObjects/door.js';

/**
 * Escena principal de juego.
 * @extends Phaser.Scene
 */
export default class Level1 extends Phaser.Scene {

	constructor(){
		super({key: 'Level1'})
	}
	preload(){
        this.load.image("door", "assets/Items/Doors/Door.png");
        this.load.image("barra", "assets/UI/barra.png");
        this.load.image('player', 'assets/Hero/player.png');
        this.load.image('pauseButton', 'assets/Menu/pauseButton.png');
        this.load.image('maskH', 'assets/Hero/mask2.png');
        this.load.image('help1', 'assets/UI/help1.png');
        this.load.image('help2', 'assets/UI/help2.png');
        // Imagen power up de tiempo
        this.load.image('timePowerUp', 'assets/Items/PowerUp/PowerUpTiempo.png');

        this.load.image('tiles', 'assets/maps/Catacombs/mainlevbuild.png')
        this.load.image('tilesCave', 'assets/maps/Cave/MainLev2.0.png')
		this.load.tilemapTiledJSON('tilemap', 'assets/maps/Level01.json')
        
        //Audio
        this.load.audio('levelSong', 'assets/Audio/AmbientSound.mp3')
        this.load.audio('torchEndSound', 'assets/Audio/torchEnd.mp3')
        this.load.audio('enemyMoving', 'assets/Audio/StoneMoving.mp3')
        this.load.audio('walkSound', 'assets/Audio/WalkEffect.mp3')
    }
    create(){
        var escena = this;
        //Input
        this.p = this.input.keyboard.addKey('P');

        //tilemap
        const map=this.make.tilemap({key:'tilemap'});
        const tileset=map.addTilesetImage('Catacomb1', 'tiles');
        const tileset2=map.addTilesetImage('Cave1', 'tilesCave');
        const btiles=map.createLayer('Fondo', tileset2);
        this.ctiles=map.createLayer('Muros',tileset);
        this.ctiles2=map.createLayer('Muros2',tileset2);

        this.ctiles.setCollisionByExclusion([ -1, 0 ]); //colisionaran las tiles que tengan algo
        this.ctiles2.setCollisionByExclusion([ -1, 0 ]); //colisionaran las tiles que tengan algo
    
        this.player = new Player(this, 200, 220);

        const btiles2=map.createLayer('Fondo2', tileset);

        this.door = new Door (this, 543, 225);
        this.door.body.immovable = true;    

        // Array de powerUps
        this.effectType;
        this.powerUpGroup = this.physics.add.group();

        //Tutorial
        const h1 = this.add.image( 50, 60, 'help1');
        const h2 = this.add.image( 50, 300, 'help2');
        //Colisiones
        this.player.body.onCollide = true; 
        this.physics.add.collider(this.player, this.door, nextScene);
        function nextScene(){
            escena.scene.stop('Level1');
            escena.scene.launch('Level2');
        }
        this.physics.add.collider(this.player, this.ctiles);
        this.physics.add.collider(this.player, this.ctiles2);

        //Power ups
        this.physics.add.collider(this.player, this.powerUpGroup, applyPowerUp);
		function applyPowerUp(gameobj1, gameobj2){
            escena.effectType = gameobj2.getType();
            if(escena.effectType == "tiempo"){
                 // suma relleno barra
                escena.barra.x += 70;
                var result = Phaser.Math.Clamp(escena.barra.x, 5, 49);
                escena.barra.x = result;

                 // suma fuego barra
                escena.fireBarra.x += 70;
                var result = Phaser.Math.Clamp(escena.fireBarra.x, 5, 112);
                escena.fireBarra.x = result;
            }
            gameobj2.destroy();
			
		}
        this.vision_mask = this.make.sprite({
            x: 200,
            y: 200,
            key: 'maskH',
            add: false
        });
        this.vision_mask.setScale(3);
        this.vision_mask.setOrigin(0.5,0.5);
        btiles2.mask = new Phaser.Display.Masks.BitmapMask(escena, this.vision_mask );
        h1.mask = new Phaser.Display.Masks.BitmapMask(escena, this.vision_mask );
        h2.mask = new Phaser.Display.Masks.BitmapMask(escena, this.vision_mask );
        //Botón pausa
        this.pauseButton = this.add.sprite(570, 30, 'pauseButton').setInteractive();
        let self = this;
        this.pauseButton.on('pointerup', function(pointer)
        {
            self.pauseButton.setVisible(false);
            self.scene.pause('mainLevel');
            self.scene.launch('PauseScene');
        });
        
        //Audio del nivel
        const config = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        };
        var levelTheme = this.sound.add("levelSong", config);
        levelTheme.play();

    }
	update(){
        this.vision_mask.x = this.player.x;
        this.vision_mask.y = this.player.y;
        this.pauseButton.setVisible(true);
        
        if(this.p.isDown ){ // Comprobamos si pulsamos P
            this.pauseButton.setVisible(false);
			this.scene.pause('mainLevel');
            this.scene.launch('PauseScene');
		};
	}

}
