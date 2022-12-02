export default class PowerUp extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, type){

        super(scene, x, y, 'timePowerUp');

		this.scene.add.existing(this);
		this.setOrigin(1,1);
		this.setScale(0.5,0.5);
        this.scene.physics.add.existing(this);
        this.tipo = type;
    }

    getType(){
        return this.tipo;
    }

  
}