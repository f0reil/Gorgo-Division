
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
        this.load.image('player', 'assets/Hero/player.png');
        this.load.image('cone', 'assets/Hero/cone.png');
        this.load.image('floor', 'assets/maps/floor.png');
        this.load.image('mask', 'assets/Hero/mask1.png');
    }
    create(){
        this.p = this.input.keyboard.addKey('P');

        var ground = this.add.image(310,200,'floor');
        this.enemies = [];
        let player = new Player(this, 300, 150);
        this.enemy = new Enemy(this, 400, 100, player);
        this.enemy2 = new Enemy(this, 200, 100, player);
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

        player.body.onCollide = true; 
        
        for(let i=0; i< this.enemies.length; i++){
            this.physics.add.collider(player, this.enemies[i], onCollision);
        }
        
        function onCollision(){
            escena.scene.start('YouDied'); //Cambiamos a la escena de juego
            console.log('Muerto');
        }
    }
	updatePlayer(player){
        this.vision_mask.x = player.x;
        this.vision_mask.y = player.y;
        this.vision_mask.rotation = player.rotation;

        for(let i=0; i< this.enemies.length; i++){
            var dist = Phaser.Math.Distance.Between(player.x, player.y, this.enemies[i].x, this.enemies[i].y);
            let ang1 = (this.enemies[i].rotation* (180/Math.PI));
            let ang2 = (player.rotation * (180/Math.PI));
            var calc = Math.abs(ang1-ang2);
            if(((calc >=160 && calc <=180) && dist < 140) || ((calc<=200 && calc >=180) && dist < 140)) this.enemies[i].detente();
            else this.enemies[i].continua();
            
        }
	}
}
