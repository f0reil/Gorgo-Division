import BarraFuego from '../gameObjects/barraFuego.js';
import Player from '../characters/Player.js'
import Enemy from '../characters/Enemy.js'
import Door from '../gameObjects/door.js';
import Key from '../gameObjects/key.js';
import PowerUp from '../gameObjects/powerUp.js';
import Block from '../gameObjects/block.js';
import Wind from '../gameObjects/wind.js';


/**
 * Escena tercera del juego
 * @extends Phaser.Scene
 */
export default class Level3 extends Phaser.Scene {

	constructor(){
		super({key: 'Level3'})
	}
	preload(){

    }
    create(){
        var escena = this;
        // paramos y relanzamos la escena para resetear la barra de fuego
        this.scene.stop('HUD');
        this.scene.launch('HUD', {});
        //Input
        this.p = this.input.keyboard.addKey('P');
        this.x = this.input.keyboard.addKey('X');
        this.c = this.input.keyboard.addKey('C');
        var ground = this.add.image(310,200,'floor');

        //tilemap
        const map=this.make.tilemap({key:'tilemap3'});
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
        this.enemies = [];
        this.enemy = new Enemy(this, 320, 150, this.player);
        this.enemy2 = new Enemy(this, 500, 70, this.player);
        this.enemies.push(this.enemy);
        this.enemies.push(this.enemy2);
        this.timePowerUp = new PowerUp(this, 550, 400, "tiempo");
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
        var block7 = new Block(this, 260, 250);
        blocksArray.push(block7);
        var block8 = new Block(this, 260, 270);
        blocksArray.push(block8);

        //trampas
        this.wind=new Wind(this,600, 290);
        this.deadlyTrap=new PowerUp(this,70, 100, "trap"); this.deadlyTrap.setScale(2.5,2.5);

        const btiles2=map.createLayer('Fondo2', tileset);
        
        this.door = new Door (this, 330, 85);
        this.door.body.immovable = true;
        this.key = new Key (this, 500, 100);
        this.key.body.immovable = true;

        // Grupo de powerUps
        this.powerUpGroup = this.physics.add.group();

        // PowerUp tiempo fuego
        this.powerUpGroup.add (this.timePowerUp);
        this.powerUpGroup.add(this.deadlyTrap);

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
            y: 150,
            key: 'mask',
            add: false,
        });
        campfire_mask.setScale(0.5,0.5);
        campfire_mask.setOrigin(0.5,0.5);
        this.staticLight.push(campfire_mask);
        const campfire_mask2 = this.make.sprite({
            x: 500,
            y: 70,
            key: 'mask',
            add: false,
        });
        campfire_mask2.setScale(0.5,0.5);
        campfire_mask2.setOrigin(0.5,0.5);
        this.staticLight.push(campfire_mask2);
        
        this.groundTorch = this.make.sprite({
            x: -1000,
            y: -1000,
            key: 'circle',
            add: false,
        });
        this.groundTorch.setOrigin(0.5, 0.5);

        //Las luces estáticas se apagan
        escena.lightsOut()
        // Añadiendo las máscaras a un contenedor
        this.lights_mask.add( [ this.vision_mask, campfire_mask, campfire_mask2, this.groundTorch] );
        this.lights_mask.setVisible(false);
        
        // Aplicando las máscaras
        this.ctiles.mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        this.ctiles2.mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        btiles.mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        btiles2.mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        ground.mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        this.timePowerUp.mask= new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        this.key.mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        this.wind.mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        this.deadlyTrap.mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        for(let i=0; i< this.enemies.length; i++){
            this.enemies[i].mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        }
        for(let i=0; i< blocksArray.length; i++){
            blocksArray[i].mask = new Phaser.Display.Masks.BitmapMask(escena, this.lights_mask );
        }
        //Colisiones
        this.player.body.onCollide = true; 
        this.physics.add.collider(this.player, this.key, ()=>{this.key.pickedUp(escena.door, this.scene.get('HUD'));} );
        this.physics.add.collider(this.player, this.door, nextScene);
        function nextScene(){
            escena.scene.stop('Level3');
            escena.player.stopAudio();
            for(let i=0; i< escena.enemies.length; i++){
                escena.enemies[i].stopAudio();
            }
            escena.scene.launch('Level4');
            // notificamos a otras escenas del nuevo nivel
            escena.scene.get('HUD').levelScene = 'Level4';
            escena.scene.get('PauseScene').levelScene = 'Level4';
            escena.scene.get('YouDied').levelScene = 'Level4';
        }
        this.physics.add.collider(this.player, this.ctiles);
        this.physics.add.collider(this.player, this.ctiles2);
        this.physics.add.collider(this.player, this.blocksGroup);
        this.physics.add.collider(this.ctiles, this.blocksGroup);
        this.physics.add.collider(this.ctiles2, this.blocksGroup);
        this.physics.add.collider(this.blocksGroup, this.blocksGroup);

        // Colisiones enemigos
        for(let i=0; i< this.enemies.length; i++){
            this.physics.add.collider(this.player, this.enemies[i], onCollision);
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
                escena.scene.get('HUD').sumaFire();
            }
            else if(escena.effectType == "velocidad"){
                escena.player.changeSpeed(6);
            }
            else if(escena.effectType=="trap"){
                onCollision();
            }
            gameobj2.destroy();
			
		}
        this.physics.add.collider(this.player, this.wind, function(){
            escena.scene.get('HUD').restaFire(); // Hemos tocado el suelo, permitimos volver a saltar
        
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

        if(this.x.isDown ){ // Comprobamos si pulsamos P
            if(this.hasTorch == true){
                this.PlaceTorch();
            }
		};
        if(this.c.isDown){
            if(this.hasTorch == false && Phaser.Math.Distance.Between(this.player.x, this.player.y, this.groundTorch.x, this.groundTorch.y) < 90){
                this.TakeTorch();
            }
        }
        if(this.hasTorch){ //comprueba el estado de la antorcha
            this.vision_mask.x = this.player.x;
            this.vision_mask.y = this.player.y;
            this.vision_mask.rotation = this.player.rotation;
        }

        for(var i=0; i< this.enemies.length; i++){ //Lógica de los enemigos
            var dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemies[i].x, this.enemies[i].y);
            var distTorch = Phaser.Math.Distance.Between(this.enemies[i].x, this.enemies[i].y, this.groundTorch.x, this.groundTorch.y);
            let ang1 = (this.enemies[i].rotation* (180/Math.PI));
            let ang2 = (this.player.rotation * (180/Math.PI));
            var calc = Math.abs(ang1-ang2);
            var tile = this.ctiles.getTileAtWorldXY(this.enemies[i].x, this.enemies[i].y);
            var tile2 = this.ctiles2.getTileAtWorldXY(this.enemies[i].x, this.enemies[i].y);
            if (tile == null && tile2 == null) this.enemies[i].saveTile();
            if(((((calc >=160 && calc <=180) && dist < 140) || ((calc<=200 && calc >=180) && dist < 140))|| distTorch < 80)&& this.scene.get('HUD').getHasLight() === true && this.hasTorch === true){
                this.enemies[i].detente();
                if(tile != null || tile2 != null) this.enemies[i].flee();
            }
            else{
                var move = true;
                let m =0;
                if(distTorch <80)move = false;
                else{
                    while(m < this.staticLight.length && move === true){
                        if(Phaser.Math.Distance.Between(this.enemies[i].x, this.enemies[i].y, this.staticLight[m].x, this.staticLight[m].y) <50) move = false;
                        m++;
                    }
                }
                if(move === false){
                    this.enemies[i].detente();
                }
                else this.enemies[i].continua();
            }
        }
	}
    torchEnd(){ //Si se termina la luz
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
        /*let config = {
            mute: false,
            volume: 0.8,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
        };*/
        //var torchEnded = this.sound.add("torchEndSound", config);
        //torchEnded.play();
    }
    lightsOut(){ //Método que apaga las luces estáticas del nivel pasado un tiempo 
        var escena = this;
        for(let i=0; i< this.staticLight.length; i++){ //Apagamos todas las luces estáticas del nivel pasados 7 segundos
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
    TakeTorch(){ //Recoger la antorcha
        this.groundTorch.x = -1000;
        this.groundTorch.y = -1000;
        this.hasTorch = true;
        
    }
    PlaceTorch(){ //colocar la antorcha
        this.groundTorch.x = this.player.x;
        this.groundTorch.y = this.player.y;
        this.hasTorch = false;
        this.vision_mask.x = -150;
    }

}
