
import Player from '../characters/Player.js'
import Enemy from '../characters/Enemy.js'

/**
 * Escena principal de juego.
 * @extends Phaser.Scene
 */
export default class mainLevel extends Phaser.Scene {

    /**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor(){
		super({key: 'mainLevel'})
	}
	preload(){
        this.load.image('player', 'assets/Hero/player.png');
        this.load.image('cone', 'assets/Hero/cone.png');
        this.load.image('floor', 'assets/maps/floor.png');
        this.load.image('torch','assets/maps/Catacombs/torch_1.png');
        this.load.image('rock','assets/maps/rock.png');
    }
    create(){
        var ground = this.add.image(310,200,'floor');
        
        // graphic object used to draw walls
        this.wallGraphics = this.add.graphics();
        this.wallGraphics.lineStyle(1, 0x00ff00);
 
        // graphic object used to draw rays of light
        this.lightGraphics = this.add.graphics();
 
        // array with all polygons in game
        this.polygons = [];
 
        this.enemies = [];
        let player = new Player(this, 300, 150);
        this.enemy = new Enemy(this, 400, 100, player);
        this.enemy2 = new Enemy(this, 200, 100, player);
        this.enemies.push(this.enemy);
        this.enemies.push(this.enemy2);
        
        var torch=this.physics.add.staticImage(200 ,300,'torch');
        this.physics.add.collider(torch, player);
        

        var rock=this.physics.add.sprite(300,300,'rock');
        this.physics.add.collider(rock, player);
        rock.body.setCollideWorldBounds();
        rock.setScale(0.3, 0.3);

        this.cone = this.add.image(1200, 1200, 'cone');
        player.body.onCollide = true; 
        var escena = this;
        for(let i=0; i< this.enemies.length; i++){
            this.physics.add.collider(player, this.enemies[i], onCollisionEnemy);
            this.physics.add.collider(torch, this.enemies[i]);
            this.physics.add.collider(rock, this.enemies[i]);
        }
        
        
        function onCollisionEnemy(){
            escena.scene.start('YouDied'); //Cambiamos a la escena de juego
            console.log('Muerto');
        }

        var startX = 200;
        var startY = 200;
        var width = 50;
        var height = 50;
        //this.wallGraphics.strokeRect(startX, startY, width, height);
        for(let i=0; i< this.enemies.length; i++){
            this.polygons[i] = ([[this.enemies[i].x, this.enemies[i].y], [this.enemies[i].x + 40, this.enemies[i].y], [this.enemies[i].x + 40, this.enemies[i].y + 40], [this.enemies[i].x, this.enemies[i].y + 40]]);
        }
        

        this.polygons.push([[startX, startY], [startX + width, startY], [startX + width, startY + height], [startX, startY + height]]);
        // walls around game perimeter
		this.polygons.push([[-1, -1], [this.sys.game.canvas.width + 1, -1], [this.sys.game.canvas.width + 1, this.sys.game.canvas.height+1], [-1, this.sys.game.canvas.height + 1]]);
    }
	updatePlayer(player){
        this.cone.x = player.x;
        this.cone.y = player.y;
        this.cone.rotation = player.rotation;

        for(let i=0; i< this.enemies.length; i++){
            var dist = Phaser.Math.Distance.Between(player.x, player.y, this.enemies[i].x, this.enemies[i].y);
            let ang1 = (this.enemies[i].rotation* (180/Math.PI));
            let ang2 = (player.rotation * (180/Math.PI));
            var calc = Math.abs(ang1-ang2);
            if(((calc >=160 && calc <=180) && dist < 130) || ((calc<=200 && calc >=180) && dist < 130)) this.enemies[i].detente();
            else this.enemies[i].continua();
            this.polygons[i] = ([[this.enemies[i].x-10, this.enemies[i].y-10], [this.enemies[i].x + 10, this.enemies[i].y-10], [this.enemies[i].x + 10, this.enemies[i].y + 10], [this.enemies[i].x-10, this.enemies[i].y + 10]]);
        }
	}
    // method to render the light
    renderLight(player){
        // determine light polygon starting from pointer coordinates
        let visibility = this.createLightPolygon(player.x, player.y);
 
        // clear and prepare lightGraphics graphic object
        this.lightGraphics.clear();
        this.lightGraphics.lineStyle(2, 0xcccccc);
        this.lightGraphics.fillStyle(0xffffff, 0.4);
 
        // begin a drawing path
        this.lightGraphics.beginPath();
 
        // move the graphic pen to first vertex of light polygon

        if(visibility != null){
			this.lightGraphics.moveTo(visibility[0][0], visibility[0][1]);
 
        	// loop through all light polygon vertices
        	for(let i = 1; i <= visibility.length; i ++){
 
            // draw a line to i-th light polygon vertex
            this.lightGraphics.lineTo(visibility[i % visibility.length][0], visibility[ i %visibility.length][1]);
       		}
		}
 
        // close, stroke and fill light polygon
        this.lightGraphics.closePath();
        this.lightGraphics.fillPath();
        this.lightGraphics.strokePath();
    }
 
    // method to create light polygon using visibility_polygon.js
    createLightPolygon(x, y){
        let segments = VisibilityPolygon.convertToSegments(this.polygons);
        segments = VisibilityPolygon.breakIntersections(segments);
        let position = [x, y];
        if (VisibilityPolygon.inPolygon(position, this.polygons[this.polygons.length - 1])) {
            return VisibilityPolygon.compute(position, segments);
        }
        return null;
    }
}
