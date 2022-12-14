export default class Door extends Phaser.GameObjects.Sprite{
    
    constructor(scene, x, y){

        super(scene, x, y);
        this.scene = scene;
        this.open = false;
		this.scene.add.existing(this);
        scene.physics.add.existing(this); 
        this.setScale(1,1);   
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    openDoor(){ //Metódo que comprueba que la puerta esté abierta
        this.open = true;
    }
}