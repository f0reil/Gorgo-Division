export default class BarraFuego extends Phaser.GameObjects.Sprite{
    
    constructor(scene, x, y){

        super(scene, x, y, "fire");


		this.scene.add.existing(this);
		this.setOrigin(1,1);
		this.setScale(2,2);

        var width =  100;
        var height = 20;
    }

    render(){
        
    }
}