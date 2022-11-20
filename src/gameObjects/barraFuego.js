export default class BarraFuego extends Phaser.GameObjects.Sprite{
    
    constructor(scene, x, y){

        super(scene, x, y, "fire");


		this.scene.add.existing(this);
		this.setOrigin(1,1);
		this.setScale(2,2);

        var width =  100;
        var height = 20;

       /* this.scene.anims.create({
            key: 'fireAnim'	,
            frames: scene.anims.generateFrameNumbers('fire', {start: 0, end:2}),
            frameRate: 10,
            repeat: -1
            });
    
            this.play('fireAnim');*/
    }

    /*preUpdate(t, dt){
        super.preUpdate(t, dt);
        this.scene.updatePlayer(this);
    }*/
}