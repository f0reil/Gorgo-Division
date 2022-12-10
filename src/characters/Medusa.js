export default class Medusa extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, player) {
		
		super(scene, x, y, 'medusa');
		this.isStuned = false;
		this.scene = scene;
		this.time;
		this.Timer;
		this.scene.add.existing(this);
		this.setOrigin(0.5,0.5);
		this.setScale(0.5,0.5);
		this.followPlayer = player;
		this.speed = 2;
		this.scene.physics.add.existing(this);
		// Decimos que el caballero colisiona con los límites del mundo
		this.body.setCollideWorldBounds();
		this.movimiento = true;	

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
		this.time = t;
		var target = Phaser.Math.Angle.BetweenPoints(this, this.followPlayer);
		if(this.isStuned === false) this.rotation = target;
		else if(this.isStuned === true){
			if(this.time >= this.Timer) this.continua();
		}
		if(this.movimiento)this.scene.physics.moveToObject(this, this.followPlayer, this.speed*dt);
		else this.body.setVelocity(0);
	}
	detente(){
		this.movimiento = false;
		this.isStuned = true;
		this.Timer = this.time + 5000;
		this.enemyMoves.pause();
	}
	continua(){
		this.movimiento = true;
		this.isStuned = false;
		this.enemyMoves.resume();
	}
	hunt(){
		this.isStuned = false;
		this.speed = 3;
	}
	stopAudio(){
		this.enemyMoves.stop();
	}
	getStuned(){
		return this.isStuned;
	}
}