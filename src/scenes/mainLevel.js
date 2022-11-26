import BarraFuego from '../gameObjects/barraFuego.js';
import Player from '../characters/Player.js'
import Enemy from '../characters/Enemy.js'

/**
 * Escena principal de juego.
 * @extends Phaser.Scene
 */
export default class mainLevel extends Phaser.Scene {

	constructor(){
		super({key: 'mainLevel'})
	}
	preload(){
        this.load.image("fire", "assets/Items/Torch/torch_1.png");
        this.load.image("bordeBarra","assets/UI/bordeBarra.png");
        this.load.image("barra", "assets/UI/barra.png");
        this.load.image('player', 'assets/Hero/player.png');
        this.load.image('cone', 'assets/Hero/cone.png');
        this.load.image('floor', 'assets/maps/floor.png');
        this.load.image('mask', 'assets/Hero/mask1.png');
        this.load.image('pauseButton', 'assets/Menu/pauseButton.png');

        this.load.image('tiles', 'assets/maps/Catacombs/mainlevbuild.png')
		this.load.tilemapTiledJSON('tilemap', 'assets/maps/Level00.json')

        this.load.path = 'assets/Items/Torch/';

        this.load.image('torch1', 'torch_1.png');
        this.load.image('torch2', 'torch_2.png');
        this.load.image('torch3', 'torch_3.png');
        this.load.image('torch4', 'torch_4.png');
    }
    create(){
        this.p = this.input.keyboard.addKey('P');
        var ground = this.add.image(310,200,'floor');

        //tilemap
        const map=this.make.tilemap({key:'tilemap'});
        const tileset=map.addTilesetImage('Catacomb1', 'tiles');
        const ctiles=map.createLayer('Muros',tileset);
        ctiles.setCollisionByExclusion([ -1, 0 ]); //colisionaran las tiles que tengan algo


        this.enemies = [];
        this.player = new Player(this, 300, 150);
        this.enemy = new Enemy(this, 400, 100, this.player);
        this.enemy2 = new Enemy(this, 200, 100, this.player);
        this.barra = this.add.image(49, 20, 'barra');
        this.add.image(49,20, 'bordeBarra');
        this.fireBarra = new BarraFuego(this, 112, 30);
        this.enemies.push(this.enemy);
        this.enemies.push(this.enemy2);
        var escena = this;
       
       
        this.lights_mask = this.make.container(0, 0);
        
        this.vision_mask = this.make.sprite({
            x: 200,
            y: 200,
            key: 'cone',
            add: false
        });
       

        // campfire mask
        const campfire_mask = this.make.sprite({
            x: 300,
            y: 200,
            key: 'mask',
            add: false,
        });

        // adding the images to the container
        this.lights_mask.add( [ this.vision_mask, campfire_mask ] );

        // now this is the important line I did not expect: 
        // the lights container was being drawn into the scene (even though I used "make" and not "add")
        this.lights_mask.setVisible(false);

        // adding the lights mask to the render texture
        ground.mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        for(let i=0; i< this.enemies.length; i++){
            this.enemies[i].mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        }

        this.player.body.onCollide = true; 
        this.physics.add.collider(this.player, ctiles);
        
        for(let i=0; i< this.enemies.length; i++){
            this.physics.add.collider(this.player, this.enemies[i], onCollision);
            this.physics.add.collider(ctiles, this.enemies[i]);
        }
      

        this.pauseButton = this.add.sprite(570, 30, 'pauseButton').setInteractive();
        let self = this;
        this.pauseButton.on('pointerup', function(pointer)
        {
            self.pauseButton.setVisible(false);
            self.scene.pause('mainLevel');
            self.scene.launch('PauseScene');
        });
        
        function onCollision(){
            escena.scene.start('YouDied'); //Cambiamos a la escena de juego
        }
    }
	update(){
        this.barra.x -= 0.05;
        this.fireBarra.x -= 0.05;

        if(this.fireBarra.x <= 5){
            this.scene.start('YouDied');
        }

        this.pauseButton.setVisible(true);
        
        if(this.p.isDown ){ // Comprobamos si pulsamos P
            this.pauseButton.setVisible(false);
			this.scene.pause('mainLevel');
            this.scene.launch('PauseScene');
		};

        this.vision_mask.x = this.player.x;
        this.vision_mask.y = this.player.y;
        this.vision_mask.rotation = this.player.rotation;

        for(let i=0; i< this.enemies.length; i++){
            var dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemies[i].x, this.enemies[i].y);
            let ang1 = (this.enemies[i].rotation* (180/Math.PI));
            let ang2 = (this.player.rotation * (180/Math.PI));
            var calc = Math.abs(ang1-ang2);
            if(((calc >=160 && calc <=180) && dist < 140) || ((calc<=200 && calc >=180) && dist < 140)) this.enemies[i].detente();
            else this.enemies[i].continua();
            
        }
	}
}
