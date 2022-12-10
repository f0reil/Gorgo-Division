export default class Player extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y) {
		super(scene, x, y, 'player');

		this.scene = scene;
		this.scene.add.existing(this);
		this.setOrigin(0.5,0.5);
		this.setScale(0.5,0.5);
		this.d = this.scene.input.keyboard.addKey('D'); // registramos la tecla D como input
		this.a = this.scene.input.keyboard.addKey('A'); // registramos la tecla A como input
		this.w = this.scene.input.keyboard.addKey('W'); // registramos la tecla W como input
		this.s = this.scene.input.keyboard.addKey('S'); // registramos la tecla S como input
		this.pointer = this.scene.input.activePointer; // registramos input de ratón
		this.speed = 4;
		//this.body.setCollideWorldBounds();
		scene.physics.add.existing(this);

		// Decimos que el caballero colisiona con los límites del mundo
		this.body.setCollideWorldBounds();
		scene.load.audio('walkSound', 'assets/Audio/WalkEffect.mp3')
		const config = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        }; 
        this.playerMoves = scene.sound.add("walkSound", config);
		this.playerMoves.play();
	}
	preUpdate(t, dt){

		super.preUpdate(t, dt); // Muy importante llamar al preUpdate del padre (Sprite) para que se ejecute la animación
		
		var target = Phaser.Math.Angle.BetweenPoints(this, this.scene.input.activePointer);
		this.rotation = target;
		this.scene.update();
		if(this.body.velocity.x == 0 && this.body.velocity.y == 0)this.playerMoves.pause();
		else this.playerMoves.resume();
		this.body.setVelocity(0); // Si no hay teclas pulsadas, su velocidad es 0
		
		if(this.w.isDown){ // Comprobamos si pulsamos W
			this.body.setVelocityY(-this.speed*dt);
		}

		if(this.s.isDown){ // Comprobamos si pulsamos S
			this.body.setVelocityY(this.speed*dt);
		}

		if(this.a.isDown){ // Comprobamos si pulsamos A
			this.body.setVelocityX(-this.speed*dt);
		}

		if(this.d.isDown){ // Comprobamos si pulsamos D
			this.body.setVelocityX(this.speed*dt);
		}
	}
	stopAudio(){
		this.playerMoves.stop();
	}
	slowed(){
		this.speed *= 0.9;
	}

}