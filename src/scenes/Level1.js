import block from '../gameObjects/block.js';
import Player from '../characters/Player.js'
import Door from '../gameObjects/door.js';
import Block from '../gameObjects/block.js';

/**
 * Escena primera del juego
 * @extends Phaser.Scene
 */
export default class Level1 extends Phaser.Scene {

	constructor(){
		super({key: 'Level1'})
	}
	preload(){
        
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
        
        //Entidades
        this.player = new Player(this, 200, 220);
        let block1 = new Block(this, 400, 200);
        let block2 = new Block(this, 400, 220);
        let block3 = new Block(this, 400, 240);
        let block4 = new Block(this, 400, 260);
        //Fondo sin colisión
        const btiles2=map.createLayer('Fondo2', tileset);

        this.door = new Door (this, 543, 225);
        this.door.body.immovable = true;    

        //Grupo de bloques
        this.BlocksGroup = this.physics.add.group();
        
        this.BlocksGroup.add(block1);
        this.BlocksGroup.add(block2);
        this.BlocksGroup.add(block3);
        this.BlocksGroup.add(block4);


        //Tutorial
        const h1 = this.add.image( 50, 60, 'help1');
        const h4 = this.add.image(50, 150, 'help4');
        const h2 = this.add.image( 50, 250, 'help2');
        const h3 = this.add.image( 50, 350, 'help3');

        //Colisiones
        this.player.body.onCollide = true; 
        this.physics.add.collider(this.player, this.door, nextScene);
        function nextScene(){ //Paso de escena
            escena.scene.stop('Level1');
            escena.player.stopAudio();
            escena.scene.launch('Level2');
            escena.scene.get('HUD').levelScene = 'Level2';
            escena.scene.get('PauseScene').levelScene = 'Level2';
            escena.scene.get('YouDied').levelScene = 'Level2';
        }

        this.physics.add.collider(this.player, this.BlocksGroup); //Colisiones varias de los bloques
        this.physics.add.collider(this.ctiles, this.BlocksGroup);
        this.physics.add.collider(this.ctiles2, this.BlocksGroup);
        this.physics.add.collider(this.BlocksGroup, this.BlocksGroup);

        this.physics.add.collider(this.player, this.ctiles); //Colisiones del jugador con el mapa
        this.physics.add.collider(this.player, this.ctiles2);
        
        //Máscara para ocultar el entorno que está por encima del jugador
        this.vision_mask = this.make.sprite({
            x: 200,
            y: 200,
            key: 'maskH',
            add: false
        });
        this.vision_mask.setScale(3);
        this.vision_mask.setOrigin(0.5,0.5);

        btiles2.mask = new Phaser.Display.Masks.BitmapMask(escena, this.vision_mask ); //oculta el mapa que está por encima y los carteles de ayuda
        h1.mask = new Phaser.Display.Masks.BitmapMask(escena, this.vision_mask );
        h2.mask = new Phaser.Display.Masks.BitmapMask(escena, this.vision_mask );
        h3.mask = new Phaser.Display.Masks.BitmapMask(escena, this.vision_mask );
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
        this.vision_mask.x = this.player.x; //Mueve la máscara
        this.vision_mask.y = this.player.y;
        this.pauseButton.setVisible(true);
        
        if(this.p.isDown ){ // Comprobamos si pulsamos P
            this.pauseButton.setVisible(false);
			this.scene.pause(escena);
            this.scene.launch('PauseScene');
		};
	}

}
