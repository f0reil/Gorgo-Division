export default class Door extends Phaser.GameObjects.Sprite{
    
    constructor(scene, x, y){

        super(scene, x, y, "door");
        this.scene = scene;
		this.scene.add.existing(this);
        scene.physics.add.existing(this); 
        this.setScale(1,1);   
    }

    create ()
    {

    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
        
   
    }

    changeScene(){
        console.log("cambio de escena");
    }
}