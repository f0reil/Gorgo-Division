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

		//this.body.setCollideWorldBounds();
		scene.physics.add.existing(this);

		// Decimos que el caballero colisiona con los límites del mundo
		this.body.setCollideWorldBounds();

		//this.body.setOffset(this.bodyOffset, 0);
		//this.body.width = this.bodyWidth;

		//this.bodyOffset = this.body.width/4;
		//this.bodyWidth = this.body.width/2;
		
	}
	preUpdate(t, dt){
		super.preUpdate(t, dt); // Muy importante llamar al preUpdate del padre (Sprite) para que se ejecute la animación
		
		var target = Phaser.Math.Angle.BetweenPoints(this, this.scene.input.activePointer);
		this.rotation = target;
		this.scene.updatePlayer(this);

		this.body.setVelocity(0); // Si no hay teclas pulsadas, su velocidad es 0

		if(this.w.isDown){ // Comprobamos si pulsamos W
			this.body.setVelocityY(-10*dt);
		}

		if(this.s.isDown){ // Comprobamos si pulsamos S
			this.body.setVelocityY(10*dt);
		}

		if(this.a.isDown){ // Comprobamos si pulsamos A
			this.body.setVelocityX(-10*dt);
		}

		if(this.d.isDown){ // Comprobamos si pulsamos D
			this.body.setVelocityX(10*dt);
		}

		//this.scene.renderLight(this);
	}
	

}