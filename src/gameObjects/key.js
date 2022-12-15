export default class Key extends Phaser.GameObjects.Sprite{
    
    constructor(scene, x, y){

        super(scene, x, y, 'key');
        this.scene = scene;
		this.scene.add.existing(this);
        scene.physics.add.existing(this); 
        this.setScale(0.5,0.5);   
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    pickedUp(door, hud){ //Al recoger la llave
        hud.showKey();
        door.openDoor();   // preguntar y comprobar
        this.destroy()
    }
}