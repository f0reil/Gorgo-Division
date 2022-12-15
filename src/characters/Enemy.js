export default class Enemy extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, player) {
		super(scene, x, y, 'statue');
		this.scene = scene;
		this.scene.add.existing(this);
		this.setOrigin(0.5,0.5);
		this.setScale(0.5,0.5);
		this.followPlayer = player;
		this.speed = 1;
		this.scene.physics.add.existing(this);
		// Decimos que la estatua colisiona con los límites del mundo
		this.body.setCollideWorldBounds();
		this.movimiento = true;	
		this.lastX = x;
		this.lastY = y;
		scene.load.audio('enemyMoving', 'assets/Audio/StoneMoving.mp3') //Ruido de movimiento
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
		super.preUpdate(t, dt); 
		var target = Phaser.Math.Angle.BetweenPoints(this, this.followPlayer); //Mira al jugador siempre
		this.rotation = target;

		if(this.movimiento)this.scene.physics.moveToObject(this, this.followPlayer, this.speed*dt); //En caso de moverse, se mueve hacia el jugador
		else this.body.setVelocity(0);
	}
	detente(){ //Se detiene
		this.movimiento = false;
		this.enemyMoves.pause();
	}
	continua(){
		this.movimiento = true;
		this.enemyMoves.resume();
	}
	hunt(){ //caza al jugador si no tiene luz
		this.speed = 4;
	}
	saveTile(){
		this.lastX = this.x;
		this.lastY = this.y;
	}
	flee(){ //Vuelve a la última casilla vacía
		this.x = this.lastX;
		this.y = this.lastY;
	}
	stopAudio(){
		this.enemyMoves.stop();
	}
}