export default class BarraFuego extends Phaser.GameObjects.Sprite{
    
    constructor(scene, x, y){

        super(scene, x, y, "fire");


		this.scene.add.existing(this);
		this.setOrigin(1,1);
		this.setScale(2,2);

        var width =  100;
        var height = 20;

        this.anims.create({
            key: 'fireAnim',
            frames: [
                { key: 'torch1' },
                { key: 'torch2' },
                { key: 'torch3' },
                { key: 'torch4', duration: 50 }
            ],
            frameRate: 8,
            repeat: -1
        });

        this.play('fireAnim');
        
    
    }

    create ()
    {
        this.add.sprite(400, 300, 'torch1')
            .play('fireAnim');
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    addTime() {
        console.log("holu" + this.x);
        this.x += 60;
        console.log("adios" + this.x);
    }
}