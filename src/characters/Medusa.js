export default class Medusa extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, player) {
		
		super(scene, x, y, 'medusa');
		this.isStuned = false; //variable que controla si está aturdida
		this.scene = scene;
		this.time; //Variables que controlan el tiempo que lleva aturdida
		this.Timer;
		this.scene.add.existing(this);
		this.setOrigin(0.5,0.5);
		this.setScale(0.3,0.3);
		this.followPlayer = player; //Sigue al jugador
		this.speed = 2;
		this.scene.physics.add.existing(this);
		// Decimos que el medusa colisiona con los límites del mundo
		this.body.setCollideWorldBounds();
		this.movimiento = true;	

		scene.load.audio('snakeSound', 'assets/Audio/Snake.mp3') //Ruido de medusa
		const config = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        }; 
        this.enemyMoves = scene.sound.add("snakeSound", config);
        this.enemyMoves.play();
	}

	preUpdate(t, dt){ 
		super.preUpdate(t, dt);
		this.time = t;
		var target = Phaser.Math.Angle.BetweenPoints(this, this.followPlayer); 
		var dist = Phaser.Math.Distance.Between(this.followPlayer.x, this.followPlayer.y, this.x, this.y);
		var result = Phaser.Math.Clamp(dist, 0, 100);
		this.enemyMoves.setVolume((100-result)/100); //El ruido de medusa se intensifica según se acerca al jugador
		if(this.isStuned === false) this.rotation = target; //Solo mirará al jugador si no está aturdida
		else if(this.isStuned === true){
			//Comprueba el "temporizador" para saber si puede o no continuar 
			if(this.time >= this.Timer) this.continua();
		}
		if(this.movimiento)this.scene.physics.moveToObject(this, this.followPlayer, this.speed*dt); //se mueve hacia el jugador si no está aturdida
		else this.body.setVelocity(0);
	}
	detente(){//Detiene el movimiento y actualiza el contador
		this.movimiento = false;
		this.isStuned = true;
		this.Timer = this.time + 5000;
		this.enemyMoves.pause();
	}
	continua(){ //vuelve a moverse
		this.movimiento = true;
		this.isStuned = false;
		this.enemyMoves.resume();
	}
	hunt(){ //En caso de que se termina la luz aumenta su velocidad
		this.isStuned = false;
		this.speed = 3;
	}
	stopAudio(){ 
		this.enemyMoves.stop();
	}
	getStuned(){ //Devuelve su estado
		return this.isStuned;
	}
}