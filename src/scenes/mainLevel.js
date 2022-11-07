
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
        this.load.image('floor', 'assets/floor.png');
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
 
        // add random boxes
        //for(let i = 0; i < gameOptions.boxes; i ++){
        //    this.addRandomBox();
        //}
        let player = new Player(this, 300, 150);
        this.enemy = new Enemy(this, 400, 100, player);

        player.body.onCollide = true; 
        var escena = this;
        this.physics.add.collider(player, this.enemy, onCollision);
        function onCollision(){
            escena.scene.start('YouDied'); //Cambiamos a la escena de juego
            console.log('Muerto');
        }

        var startX = 200;
        var startY = 200;
        var width = 50;
        var height = 50;
        //this.wallGraphics.strokeRect(startX, startY, width, height);
        this.polygons[0] = ([[this.enemy.x, this.enemy.y], [this.enemy.x + 40, this.enemy.y], [this.enemy.x + 40, this.enemy.y + 40], [this.enemy.x, this.enemy.y + 40]]);

        this.polygons[1]=([[startX, startY], [startX + width, startY], [startX + width, startY + height], [startX, startY + height]]);
        // walls around game perimeter
        //this.polygons[2]=([[player.x -100, player.y -100], [player.x +100, player.y -100], [player.x +100, player.y +100], [player.x -100, player.y +100]]);
		this.polygons.push([[-1, -1], [this.sys.game.canvas.width + 1, -1], [this.sys.game.canvas.width + 1, this.sys.game.canvas.height+1], [-1, this.sys.game.canvas.height + 1]]);
       
        //this.renderLight(player);
    }
    
    updateEnemy(enemy){
        this.polygons[0] = ([[enemy.x-10, enemy.y-10], [enemy.x + 10, enemy.y-10], [enemy.x + 10, enemy.y + 10], [enemy.x-10, enemy.y + 10]]);
    }
	updatePlayer(player){
        let ang1 = (this.enemy.rotation* (180/Math.PI));
        let ang2 = (player.rotation * (180/Math.PI));
        var calc = Math.abs(ang1-ang2);
        if((calc >=160 && calc <=180) || (calc<=200 && calc >=180)) this.enemy.detente();
        else this.enemy.continua();

		var startX = 200;
        var startY = 200;
        var width = 50;
        var height = 50;
        this.polygons[1] = ([[startX, startY], [startX + width, startY], [startX + width, startY + height], [startX, startY + height]]);
		//this.polygons[2]=([[player.x -100, player.y -200],[player.x , player.y -220], [player.x +100, player.y -200],[player.x +120, player.y -150], [player.x +20, player.y +20], [player.x -20, player.y +20],[player.x -120, player.y -150]]);
		//this.polygons[2] =([[player.x -200, player.y -200],[player.x +200 , player.y -200], [player.x +10, player.y +10], [player.x -10, player.y +10]]);
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
