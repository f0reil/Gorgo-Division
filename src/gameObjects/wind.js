export default class Wind extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y){
        super(scene, x, y, "wind");
 
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setOrigin(1,1);
        this.setScale(1,1);
        //inmóvil
        this.enableBody = true;
        this.body.immovable = true;
        //reajustamos el collider
        this.body.offset.y = this.body.width*2.5;
        this.body.offset.x=this.body.width*0.5;
        this.bodyHeight=this.body.height;
		    this.bodyWidth = this.body.width*4;
		    this.body.width = this.bodyWidth;
        this.body.height=this.bodyHeight;

        //animación
        this.anims.create({
          key:'windy',
          frames:[
          {key:'wind1'},
          {key:'wind2'},
          {key:'wind3'},
          {key:'wind4'},
          {key:'wind5', duration:50}
        ],
        frameRate:5,
        repeat:-1
    });
    this.play('windy');
    
  }  
 
}
