
export default class TopSecret extends Phaser.Scene {
	constructor(){
		super({key: 'TopSecret'})
	}
	preload(){
        this.load.image('t1','assets/Items/TopSecret/Untitled-Artwork-1.png');
        this.load.image('t2','assets/Items/TopSecret/Untitled-Artwork-2.png');
        this.load.image('t3','assets/Items/TopSecret/Untitled-Artwork-3.png');
        this.load.image('t4','assets/Items/TopSecret/Untitled-Artwork-4.png');
        this.load.image('t5','assets/Items/TopSecret/Untitled-Artwork-5.png');
        this.load.image('t6','assets/Items/TopSecret/Untitled-Artwork-6.png');
        this.load.image('t7','assets/Items/TopSecret/Untitled-Artwork-7.png');
        this.load.image('t8','assets/Items/TopSecret/Untitled-Artwork-8.png');
        this.load.image('t9','assets/Items/TopSecret/Untitled-Artwork-9.png');
        this.load.image('t10','assets/Items/TopSecret/Untitled-Artwork-10.png');
        this.load.image('t11','assets/Items/TopSecret/Untitled-Artwork-11.png');
        this.load.image('t12','assets/Items/TopSecret/Untitled-Artwork-12.png');
        this.load.image('t13','assets/Items/TopSecret/Untitled-Artwork-13.png');
        this.load.image('t14','assets/Items/TopSecret/Untitled-Artwork-14.png');
        this.load.image('t15','assets/Items/TopSecret/Untitled-Artwork-15.png');
        this.load.image('t16','assets/Items/TopSecret/Untitled-Artwork-16.png');
        this.load.image('t17','assets/Items/TopSecret/Untitled-Artwork-17.png');
        this.load.image('t18','assets/Items/TopSecret/Untitled-Artwork-18.png');
        this.load.image('t19','assets/Items/TopSecret/Untitled-Artwork-19.png');
        this.load.image('t20','assets/Items/TopSecret/Untitled-Artwork-20.png');
        this.load.image('t21','assets/Items/TopSecret/Untitled-Artwork-21.png');
    }
    create(){
        this.anims.create({
            key: 'cookies',
            frames: [
                { key: 't1' },
                { key: 't2' },
                { key: 't3' },
                { key: 't4' },
                { key: 't5' },
                { key: 't6' },
                { key: 't7' },
                { key: 't8' },
                { key: 't9' },
                { key: 't10' },
                { key: 't11' },
                { key: 't12' },
                { key: 't13' },
                { key: 't14' },
                { key: 't15' },
                { key: 't16' },
                { key: 't17' },
                { key: 't18' },
                { key: 't19' },
                { key: 't20' },
                { key: 't21', duration: 50 }
            ],
            frameRate: 2,
            repeat: -1
        });

        var movie = this.add.sprite(135, 0, 't1').play('cookies');
        movie.setOrigin(0,0);
        movie.setScale(2.2,2.2);
    }
    
}