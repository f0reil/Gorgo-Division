export default class Enemy extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, player) {
		super(scene, x, y, 'player');
		this.scene = scene;
		this.scene.add.existing(this);
		this.setOrigin(0.5,0.5);
		this.setScale(0.5,0.5);
		this.followPlayer = player;
		
		this.scene.physics.add.existing(this);
		// Decimos que el caballero colisiona con los límites del mundo
		this.body.setCollideWorldBounds();
		this.movimiento = true;
	}

	preUpdate(t, dt){ 
		super.preUpdate(t, dt); // Muy importante llamar al preUpdate del padre (Sprite) para que se ejecute la animación
		var target = Phaser.Math.Angle.BetweenPoints(this, this.followPlayer);
		this.rotation = target;

		if(this.movimiento)this.scene.physics.moveToObject(this, this.followPlayer, 1*dt);
		else this.body.setVelocity(0);
	}
	detente(){
		this.movimiento = false;
	}
	continua(){
		this.movimiento = true;
	}
}