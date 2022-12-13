import BarraFuego from '../gameObjects/barraFuego.js';
import Player from '../characters/Player.js'
import Medusa from '../characters/Medusa.js'
import Door from '../gameObjects/door.js';
import PowerUp from '../gameObjects/powerUp.js';
import Block from '../gameObjects/block.js';

/**
 * Escena principal de juego.
 * @extends Phaser.Scene
 */
export default class Level4 extends Phaser.Scene {

	constructor(){
		super({key: 'Level4'})
	}
	preload(){

    }
    create(){
        var escena = this;
        //Input
        this.p = this.input.keyboard.addKey('P');
        this.x = this.input.keyboard.addKey('X');
        this.c = this.input.keyboard.addKey('C');
        var ground = this.add.image(310,200,'floor');

        //tilemap
        const map=this.make.tilemap({key:'tilemap4'});
        const tileset=map.addTilesetImage('Catacomb1', 'tiles');
        const tileset2=map.addTilesetImage('Cave1', 'tilesCave');
        const btiles=map.createLayer('Fondo', tileset2);
        this.ctiles=map.createLayer('Muros',tileset);
        this.ctiles2=map.createLayer('Muros2',tileset2);

        this.ctiles.setCollisionByExclusion([ -1, 0 ]); //colisionaran las tiles que tengan algo
        this.ctiles2.setCollisionByExclusion([ -1, 0 ]); //colisionaran las tiles que tengan algo
    
        //Entidades
        this.player = new Player(this, 320, 550);
        this.hasTorch = true;
        this.numGems =0;
        this.medusa = new Medusa(this, 320, 200, this.player);

        this.timePowerUp = new PowerUp(this, 550, 400, "tiempo");
        this.speedPowerUp = new PowerUp(this, 70, 270, "velocidad");

        var blocksArray = [];
        var block1 = new Block(this, 540, 350);
        blocksArray.push(block1);
        var block2 = new Block(this, 520, 350);
        blocksArray.push(block2);
        var block3 = new Block(this, 500, 350);
        blocksArray.push(block3);
        var block4 = new Block(this, 480, 370);
        blocksArray.push(block4);
        var block5 = new Block(this, 480, 390);
        blocksArray.push(block5);
        var block6 = new Block(this, 480, 410);
        blocksArray.push(block6);
        var block7 = new Block(this, 105, 112);
        block7.setScale(0.7,1);
        blocksArray.push(block7);
        var block8 = new Block(this, 125, 112);
        block8.setScale(0.7,1);
        blocksArray.push(block8);

        const btiles2=map.createLayer('Fondo2', tileset);
        this.gemGroup = this.physics.add.group();
        var g1 = this.add.image(115,70,'gem');
        this.gemGroup.add(g1);
        var g2 = this.add.image(105,355,'gem');
        this.gemGroup.add(g2);
        var g3 = this.add.image(305,240,'gem');
        this.gemGroup.add(g3);
        var g4 = this.add.image(450,300,'gem');
        this.gemGroup.add(g4);
        var g5 = this.add.image(450,70,'gem');
        this.gemGroup.add(g5);

        this.door = new Door (this, 315, 75);
        this.door.body.immovable = true;

        // BARRA
        this.barra = this.add.image(49, 20, 'barra'); // relleno rojo
        this.add.image(49,20, 'bordeBarra'); // borde rojo oscuro
        this.fireBarra = new BarraFuego(this, 112, 30); // fuego con animacion
        this.fireBurnSpeed = 0.025;
        this.hasLight = true;

        // Grupo de powerUps
        this.powerUpGroup = this.physics.add.group();

        // PowerUp tiempo fuego
        this.powerUpGroup.add (this.timePowerUp);
        this.powerUpGroup.add (this.speedPowerUp);

        //Grupo de bloques
        this.blocksGroup = this.physics.add.group();
        this.blocksGroup.add(block1);
        this.blocksGroup.add(block2);
        this.blocksGroup.add(block3);
        this.blocksGroup.add(block4);
        this.blocksGroup.add(block5);
        this.blocksGroup.add(block6);
        this.blocksGroup.add(block7);
        this.blocksGroup.add(block8);
        
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
            x: 320,
            y: 70,
            key: 'mask',
            add: false,
        });
        campfire_mask.setScale(0.5,0.5);
        campfire_mask.setOrigin(0.5,0.5);
        this.staticLight.push(campfire_mask);
        const campfire_mask2 = this.make.sprite({
            x: 320,
            y: 270,
            key: 'mask',
            add: false,
        });
        campfire_mask2.setOrigin(0.5,0.5);
        this.staticLight.push(campfire_mask2);
        this.tweens.add({
            targets: campfire_mask2,
            alpha: 0,
            duration: 2000,
            ease: 'Sine.easeInOut',
            loop: 0,
            yoyo: false,
            onComplete: function () { campfire_mask2.x = -1000; },
        });

        this.groundTorch = this.make.sprite({
            x: -1000,
            y: -1000,
            key: 'circle',
            add: false,
        });
        this.groundTorch.setOrigin(0.5, 0.5);

        //Las luces estáticas se apagan
        //escena.lightsOut()
        // Añadiendo las máscaras a un contenedor
        this.lights_mask.add( [ this.vision_mask, campfire_mask, campfire_mask2, this.groundTorch] );
        this.lights_mask.setVisible(false);
        
        // Aplicando las máscaras
        this.ctiles.mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        this.ctiles2.mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        btiles.mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        btiles2.mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        ground.mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        this.medusa.mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        this.timePowerUp.mask= new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        this.speedPowerUp.mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );

        for(let i=0; i< blocksArray.length; i++){
            blocksArray[i].mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        }
        //Colisiones
        this.player.body.onCollide = true; 
        this.physics.add.collider(this.player, this.door, nextScene);
        function nextScene(){
            if(escena.numGems >= 4){
                escena.scene.stop('Level4');
                escena.player.stopAudio();
                escena.medusa.stopAudio();
                escena.scene.launch('YouWin');
            }
        }
        this.physics.add.collider(this.player, this.ctiles);
        this.physics.add.collider(this.player, this.ctiles2);
        this.physics.add.collider(this.player, this.blocksGroup);
        this.physics.add.collider(this.ctiles, this.blocksGroup);
        this.physics.add.collider(this.ctiles2, this.blocksGroup);
        this.physics.add.collider(this.blocksGroup, this.blocksGroup);

        this.physics.add.collider(this.player, this.medusa, onCollision);
        function onCollision(){
            if(escena.medusa.getStuned() === false){
                escena.scene.start('YouDied'); //Cambiamos a la escena de juego
                levelTheme.stop();
                escena.medusa.stopAudio();
                escena.player.stopAudio();
            }
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
            else if(escena.effectType == "velocidad"){
                escena.player.changeSpeed(6);
            }
            gameobj2.destroy();
			
		}
        this.physics.add.collider(this.player, this.gemGroup, takeGem);
		function takeGem(gameobj1, gameobj2){
            escena.numGems ++;
            escena.player.slowed();
            gameobj2.destroy();
			
		}

        //Botón pausa
        this.pauseButton = this.add.sprite(570, 30, 'pauseButton').setInteractive();
        let self = this;
        this.pauseButton.on('pointerup', function(pointer)
        {
            self.pauseButton.setVisible(false);
            self.scene.pause(escena);
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
        var distTorch = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.groundTorch.x, this.groundTorch.y);
        if(this.p.isDown ){ // Comprobamos si pulsamos P
            this.pauseButton.setVisible(false);
			this.scene.pause(escena);
            this.scene.launch('PauseScene');
		};
        if(this.x.isDown ){ // Comprobamos si pulsamos P
            if(this.hasTorch == true){
                this.PlaceTorch();
            }
		};
        if(this.c.isDown){
            if(this.hasTorch == false && distTorch < 90){
                this.TakeTorch();
            }
        }
        if(this.hasTorch){
            this.vision_mask.x = this.player.x;
            this.vision_mask.y = this.player.y;
            this.vision_mask.rotation = this.player.rotation;
        }
        var dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.medusa.x, this.medusa.y);
        let ang1 = (this.medusa.rotation* (180/Math.PI));
        let ang2 = (this.player.rotation * (180/Math.PI));
        var calc = Math.abs(ang1-ang2);
        if((((calc >=160 && calc <=180) && dist < 140) || ((calc<=200 && calc >=180) && dist < 140))&& (this.hasTorch === true || distTorch <100) && this.medusa.getStuned()===false){
            this.scene.start('YouDied');
        }
	}
    torchEnd(){
        this.medusa.hunt();
        this.tweens.add({
            targets: this.vision_mask,
            alpha: 0,
            duration: 300,
            ease: 'Sine.easeInOut',
            loop: 0,
            yoyo: false
        });
        this.tweens.add({
            targets: this.groundTorch,
            alpha: 0,
            duration: 300,
            ease: 'Sine.easeInOut',
            loop: 0,
            yoyo: false
        });
        this.groundTorch.x = -1000;
        this.groundTorch.y = -1000;
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
                duration: 7000,
                ease: 'Sine.easeInOut',
                loop: 0,
                yoyo: false,
                onComplete: function () { escena.staticLight[i].x = -1000; },
            });
        }
    }
    TakeTorch(){
        this.groundTorch.x = -1000;
        this.groundTorch.y = -1000;
        this.hasTorch = true;
        
    }
    PlaceTorch(){
        this.groundTorch.x = this.player.x;
        this.groundTorch.y = this.player.y;
        this.hasTorch = false;
        this.vision_mask.x = -150;
        if(Phaser.Math.Distance.Between(this.groundTorch.x, this.groundTorch.y, this.medusa.x, this.medusa.y) < 60){
            this.medusa.detente();
        }
    }

}
