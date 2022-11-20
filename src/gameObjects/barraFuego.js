export default class BarraFuego extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, tiempoMax){
        super(scene,x, y, 'fire');

		this.scene = scene;
		this.scene.add.existing(this);
		this.setOrigin(0.5,0.5);
        
    }


}