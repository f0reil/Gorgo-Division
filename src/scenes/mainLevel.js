import BarraFuego from '../gameObjects/barraFuego.js';
import Player from '../characters/Player.js'
import Enemy from '../characters/Enemy.js'
import Door from '../gameObjects/door.js';
import PowerUp from '../gameObjects/powerUp.js';

/**
 * Escena principal de juego.
 * @extends Phaser.Scene
 */
export default class mainLevel extends Phaser.Scene {

	constructor(){
		super({key: 'mainLevel'})
	}
	preload(){
        this.load.image("door", "assets/Items/Doors/Door.png");
        this.load.image("fire", "assets/Items/Torch/torch_1.png");
        this.load.image("bordeBarra","assets/UI/bordeBarra.png");
        this.load.image("barra", "assets/UI/barra.png");
        this.load.image('player', 'assets/Hero/player.png');
        this.load.image('cone', 'assets/Hero/cone.png');
        this.load.image('circle', 'assets/Hero/TorchMask.png');
        this.load.image('floor', 'assets/maps/floor.png');
        this.load.image('mask', 'assets/Hero/mask1.png');
        this.load.image('pauseButton', 'assets/Menu/pauseButton.png');

        // Imagen power up de tiempo
        this.load.image('timePowerUp', 'assets/Items/PowerUp/PowerUpTiempo.png');

        this.load.image('tiles', 'assets/maps/Catacombs/mainlevbuild.png')
		this.load.tilemapTiledJSON('tilemap', 'assets/maps/Level00.json')
        
        //Audio
        this.load.audio('levelSong', 'assets/Audio/AmbientSound.mp3')
        this.load.audio('torchEndSound', 'assets/Audio/torchEnd.mp3')
        this.load.audio('enemyMoving', 'assets/Audio/StoneMoving.mp3')
        this.load.audio('walkSound', 'assets/Audio/WalkEffect.mp3')
        // Imagenes antorcha de la barra
        this.load.path = 'assets/Items/Torch/';

        this.load.image('torch1', 'torch_1.png');
        this.load.image('torch2', 'torch_2.png');
        this.load.image('torch3', 'torch_3.png');
        this.load.image('torch4', 'torch_4.png');

        
    }
    create(){
        var escena = this;
        //Input
        this.p = this.input.keyboard.addKey('P');

        var ground = this.add.image(310,200,'floor');

        //Entidades
        this.player = new Player(this, 300, 150);
        this.enemies = [];
        this.enemy = new Enemy(this, 400, 100, this.player);
        this.enemy2 = new Enemy(this, 200, 100, this.player);
        this.enemies.push(this.enemy);
        this.enemies.push(this.enemy2);

        //tilemap
        const map=this.make.tilemap({key:'tilemap'});
        const tileset=map.addTilesetImage('Catacomb1', 'tiles');
        this.ctiles=map.createLayer('Muros',tileset);
        const btiles=map.createLayer('Fondo', tileset);
        this.ctiles.setCollisionByExclusion([ -1, 0 ]); //colisionaran las tiles que tengan algo
        btiles.setCollisionByExclusion([ -1, 0 ]);
        
    
        

        this.door = new Door (this, 100, 100);
        this.door.body.immovable = true;

        // BARRA
        this.barra = this.add.image(49, 20, 'barra'); // relleno rojo
        this.add.image(49,20, 'bordeBarra'); // borde rojo oscuro
        this.fireBarra = new BarraFuego(this, 112, 30); // fuego con animacion
        this.fireBurnSpeed = 0.05;
        this.hasLight = true;

        // Array de powerUps
        this.effectType;
        this.powerUpGroup = this.physics.add.group();

        // PowerUp tiempo fuego
        this.timePowerUp = new PowerUp(this, 400, 200, "tiempo");
        this.powerUpGroup.add (this.timePowerUp);

        //Máscaras de luz
        this.lights_mask = this.make.container(0, 0);
        this.vision_mask = this.make.sprite({
            x: 200,
            y: 200,
            key: 'cone',
            add: false
        });
        //Luz estática
        this.staticLight = [];
        const campfire_mask = this.make.sprite({
            x: 400,
            y: 200,
            key: 'mask',
            add: false,
        });
        campfire_mask.setScale(0.5,0.5);
        campfire_mask.setOrigin(0.5,0.5);
        this.staticLight.push(campfire_mask);
        const campfire_mask2 = this.make.sprite({
            x: 200,
            y: 150,
            key: 'mask',
            add: false,
        });
        campfire_mask2.setScale(0.5,0.5);
        campfire_mask2.setOrigin(0.5,0.5);
        this.staticLight.push(campfire_mask2);
        //Las luces estáticas se apagan
        escena.lightsOut()
        // Añadiendo las máscaras a un contenedor
        this.lights_mask.add( [ this.vision_mask, campfire_mask, campfire_mask2] );
        this.lights_mask.setVisible(false);

        // Aplicando las máscaras
        ground.mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        this.ctiles.mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        for(let i=0; i< this.enemies.length; i++){
            this.enemies[i].mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        }
        

        //Colisiones
        this.player.body.onCollide = true; 
        this.physics.add.collider(this.player, this.door, this.door.changeScene);
        this.physics.add.collider(this.player, this.ctiles);
        this.physics.add.collider(this.player, btiles);
        

        // Colisiones enemigos
        for(let i=0; i< this.enemies.length; i++){
            this.physics.add.collider(this.player, this.enemies[i], onCollision);
            this.physics.add.collider(btiles, this.enemies[i]);
        }
        function onCollision(){
            escena.scene.start('YouDied'); //Cambiamos a la escena de juego
            levelTheme.stop();
            for(let i=0; i< escena.enemies.length; i++){
                escena.enemies[i].stopAudio();
            }
            escena.player.stopAudio();
        }
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
        this.barra.x -= this.fireBurnSpeed;
        this.fireBarra.x -= this.fireBurnSpeed;
        if(this.fireBarra.x <= 5 && this.hasLight){
            this.hasLight = false;
            this.torchEnd();
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
        for(var i=0; i< this.enemies.length; i++){
            var dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemies[i].x, this.enemies[i].y);
            let ang1 = (this.enemies[i].rotation* (180/Math.PI));
            let ang2 = (this.player.rotation * (180/Math.PI));
            var calc = Math.abs(ang1-ang2);
            var tile = this.ctiles.getTileAtWorldXY(this.enemies[i].x, this.enemies[i].y);
            if (tile == null) this.enemies[i].saveTile();
            if((((calc >=160 && calc <=180) && dist < 140) || ((calc<=200 && calc >=180) && dist < 140))&& this.hasLight === true){
                this.enemies[i].detente();
                if(tile != null) this.enemies[i].flee();
            }
            else{
                var move = true;
                let m =0;
                while(m < this.staticLight.length && move === true){
                    if(Phaser.Math.Distance.Between(this.enemies[i].x, this.enemies[i].y, this.staticLight[m].x, this.staticLight[m].y) <50) move = false;
                    m++;
                }
                if(move === false){
                    this.enemies[i].detente();
                }
                else this.enemies[i].continua();
            }
        }
	}
    torchEnd(){
        for(let i=0; i< this.enemies.length; i++){
            this.enemies[i].hunt();
        }
        this.tweens.add({
            targets: this.vision_mask,
            alpha: 0,
            duration: 300,
            ease: 'Sine.easeInOut',
            loop: 0,
            yoyo: false
        });
        let config = {
            mute: false,
            volume: 0.8,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
        };
        //var torchEnded = this.sound.add("torchEndSound", config);
        //torchEnded.play();
    }
    lightsOut(){
        var escena = this;
        for(let i=0; i< this.staticLight.length; i++){
            this.tweens.add({
                targets: this.staticLight[i],
                alpha: 0,
                duration: 10000,
                ease: 'Sine.easeInOut',
                loop: 0,
                yoyo: false,
                onComplete: function () { escena.staticLight[i].x = -1000; },
            });
        }
        
    }

}
