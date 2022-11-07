export default class Enemy extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, player) {
		super(scene, x, y, 'player');

		this.scene.add.existing(this);
		this.setOrigin(0.5,0.5);
		this.setScale(0.5,0.5);
		this.followPlayer = player; // resgistramos input de ratón
		
		this.scene.physics.add.existing(this);

   		//scene.physics.add.collider(this);
		// Decimos que el caballero colisiona con los límites del mundo
		this.body.setCollideWorldBounds();
		this.movimiento = true;
	}

	preUpdate(t, dt){ 
		super.preUpdate(t, dt); // Muy importante llamar al preUpdate del padre (Sprite) para que se ejecute la animación
		if(this.movimiento === false) return;
		var target = Phaser.Math.Angle.BetweenPoints(this, this.followPlayer);
		this.rotation = target;
		
		if(this.x > this.followPlayer.x && this.y == this.followPlayer.y){ // Comprobamos si pulsamos A
			this.x -= 10*dt/1000;
		}

		if(this.x < this.followPlayer.x && this.y == this.followPlayer.y){ // Comprobamos si pulsamos A
			this.x += 10*dt/1000;
		}

		if(this.y < this.followPlayer.y && this.x == this.followPlayer.x){ // Comprobamos si pulsamos A
			this.y += 10*dt/1000;
		}

		if(this.y > this.followPlayer.y && this.x == this.followPlayer.x){ // Comprobamos si pulsamos A
			this.y -= 10*dt/1000;
		}

		if(this.x > this.followPlayer.x && this.y > this.followPlayer.y){ // Comprobamos si pulsamos A
			this.x -= 10*dt/1000;
			this.y -= 10*dt/1000;
		}
		if(this.x > this.followPlayer.x && this.y < this.followPlayer.y){ // Comprobamos si pulsamos A
			this.x -= 10*dt/1000;
			this.y += 10*dt/1000;
		}
		if(this.x < this.followPlayer.x && this.y > this.followPlayer.y){ // Comprobamos si pulsamos A
			this.x += 10*dt/1000;
			this.y -= 10*dt/1000;
		}
		if(this.x < this.followPlayer.x && this.y < this.followPlayer.y){ // Comprobamos si pulsamos A
			this.x += 10*dt/1000;
			this.y += 10*dt/1000;
		}
		this.scene.updateEnemy(this);
	}
	detente(){
		this.movimiento = false;
	}
	continua(){
		this.movimiento = true;
	}
}