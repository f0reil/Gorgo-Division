export default class Block extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y) {
		super(scene, x, y, 'block');
		this.setScale(0.7,0.7);
		this.scene.add.existing(this, true); 

		this.scene.physics.add.existing(this);

		this.body.setCollideWorldBounds();
		this.body.setBounce(2,2);
	}


	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		if(this.body.velocity.x > 3){
			this.body.velocity.x -= 3;
		} else if(this.body.velocity.x < -3){
			this.body.velocity.x += 3;
		}else if(this.body.velocity.y > 3){
			this.body.velocity.y -= 3;
		} else if(this.body.velocity.y < -3){
			this.body.velocity.y += 3;
		}

		if(this.body.velocity.x <= 3 && this.body.velocity.x > 0 || this.body.velocity.x >= -3 && this.body.velocity.x < 0){
			 this.body.velocity.x = 0;
		}
		if(this.body.velocity.y <= 3 && this.body.velocity.y > 0 || this.body.velocity.y >= -3 && this.body.velocity.y < 0){
			this.body.velocity.y = 0;
	   }
	}
}