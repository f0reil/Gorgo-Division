export default class BarraFuego{
    
    constructor(scene, x, y, tiempoMax){

		this.scene.add.existing(this);
		this.setOrigin(0.5,0.5);
		this.setScale(0.5,0.5);

        var maxTime = tiempoMax;
        var width =  100;
        var height = 20;
    }

    renderF(){
        var timeArea = Math.floor(80 / maxTime*width)
        
    }
}