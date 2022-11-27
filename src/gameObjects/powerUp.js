export default class PowerUp extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, type){

        super(scene, x, y, 'timePowerUp');

		this.scene.add.existing(this);
		this.setOrigin(1,1);
		this.setScale(0.5,0.5);
        this.scene.physics.add.existing(this);
        this.tipo = type;
    }

    create ()
    {
        

    }

    preUpdate(t, dt){
		//super.preUpdate(t, dt); // Muy importante llamar al preUpdate del padre (Sprite) para que se ejecute la animación
	

	}

    addTime() {
        console.log("holu");
    }
}