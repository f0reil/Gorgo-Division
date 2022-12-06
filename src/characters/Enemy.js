export default class Enemy extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, player) {
		super(scene, x, y, 'player');
		this.scene = scene;
		this.scene.add.existing(this);
		this.setOrigin(0.5,0.5);
		this.setScale(0.5,0.5);
		this.followPlayer = player;
		this.speed = 1;
		this.scene.physics.add.existing(this);
		// Decimos que el caballero colisiona con los límites del mundo
		this.body.setCollideWorldBounds();
		this.movimiento = true;	
		this.lastX = x;
		this.lastY = y;
		scene.load.audio('enemyMoving', 'assets/Audio/StoneMoving.mp3')
		const config = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        }; 
        this.enemyMoves = scene.sound.add("enemyMoving", config);
        this.enemyMoves.play();
	}

	preUpdate(t, dt){ 
		super.preUpdate(t, dt); // Muy importante llamar al preUpdate del padre (Sprite) para que se ejecute la animación
		var target = Phaser.Math.Angle.BetweenPoints(this, this.followPlayer);
		this.rotation = target;

		if(this.movimiento)this.scene.physics.moveToObject(this, this.followPlayer, this.speed*dt);
		else this.body.setVelocity(0);
	}
	detente(){
		this.movimiento = false;
		this.enemyMoves.pause();
	}
	continua(){
		this.movimiento = true;
		this.enemyMoves.resume();
	}
	hunt(){
		this.speed = 4;
	}
	saveTile(){
		this.lastX = this.x;
		this.lastY = this.y;
	}
	flee(){
		this.x = this.lastX;
		this.y = this.lastY;
	}
	stopAudio(){
		this.enemyMoves.stop();
	}
}