export default class Block extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y) {
		super(scene, x, y, 'block');
		this.setScale(0.7,0.7);
		this.scene.add.existing(this, true); 
		//Físicas del bloque
		this.scene.physics.add.existing(this);

		this.body.setCollideWorldBounds();
		this.body.setBounce(2,2);
	}


	preUpdate(t, dt) {
		//Movemos el bloque y ajustamos la velocidad para que no se mueva indefinidamente
		super.preUpdate(t, dt);
		if(this.body.velocity.x > 6){
			this.body.velocity.x -= 6;
		} else if(this.body.velocity.x < -6){
			this.body.velocity.x += 6;
		}else if(this.body.velocity.y > 6){
			this.body.velocity.y -= 6;
		} else if(this.body.velocity.y < -6){
			this.body.velocity.y += 6;
		}

		if(this.body.velocity.x <= 6 && this.body.velocity.x > 0 || this.body.velocity.x >= -6 && this.body.velocity.x < 0){
			 this.body.velocity.x = 0;
		}
		if(this.body.velocity.y <= 6 && this.body.velocity.y > 0 || this.body.velocity.y >= -6 && this.body.velocity.y < 0){
			this.body.velocity.y = 0;
	   }
	}
}