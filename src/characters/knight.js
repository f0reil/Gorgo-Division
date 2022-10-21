export default class Knight extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y) {
		super(scene, x, y, 'knight');

		this.scene.add.existing(this);

		this.scene.anims.create({
			key: 'idle', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('knight', 
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:3 // última imagen del Spritesheet que se ejecuta en la animación
			}), 
			frameRate: 5, // imágenes/frames por segundo
			repeat: 0
		});

		this.scene.anims.create({
			key: 'attack',
			frames: scene.anims.generateFrameNumbers('knight', {start:4, end:7}),
			frameRate: 5,
			repeat: 0
		});

		this.on('animationcomplete', end =>{ //evento que se ejecuta cuando una animación ha terminado
			//console.log(this.anims.currentAnim.key)
			if(this.anims.currentAnim.key === 'attack'){ //comprobamos si la animación que ha terminado es 'attack'
				this.play('idle'); //ejecutamos la animación 'idle'
			}
			
		})

		this.play('attack');


		this.setScale(3,3);
	}

	preUpdate(t, dt){
		super.preUpdate(t, dt);
	}

}