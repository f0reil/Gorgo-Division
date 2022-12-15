export default class PowerUp extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, type){

        if(type === 'tiempo'){ //Según su tipo, mostrarán una imagen u otra
            super(scene, x, y, 'timePowerUp');

        }
        else if(type === 'velocidad'){
            super(scene, x, y, 'velocityPowerUp');
        }

		this.scene.add.existing(this);
		this.setOrigin(1,1);
		this.setScale(0.5,0.5);
        this.scene.physics.add.existing(this);
        this.tipo = type;
        this.escena = scene;
    }

    getType(){ //Devuelve el tipo de power up
        return this.tipo;
    }
  
}