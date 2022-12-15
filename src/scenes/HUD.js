import BarraFuego from '../gameObjects/barraFuego.js';
import Key from '../gameObjects/key.js';

export default class HUD extends Phaser.Scene {
    constructor() {
        super({ key: 'HUD'}); // IMPORTANTE: existe un active : true pero voy a launchearla cada vez que empieze un nivel para resetear la barra
        this.levelScene = 'Level1';
    } 

    create(){
        //Botón pausa
        this.p = this.input.keyboard.addKey('P');
        this.pauseButton = this.add.sprite(570, 30, 'pauseButton').setInteractive();
        let self = this;
        this.pauseButton.on('pointerup', function(pointer)
        {
            self.pauseButton.setVisible(false);
            self.scene.pause(self.levelScene);
            self.scene.pause(this);
            self.scene.launch('PauseScene');
        });
        //BarraFuego
        this.barra = this.add.image(49, 20, 'barra'); // relleno rojo
        this.add.image(49,20, 'bordeBarra'); // borde rojo oscuro
        this.fireBarra = new BarraFuego(this, 112, 30); // fuego con animacion
        this.fireBurnSpeed = 0.05;
        this.hasLight = true;
        //Llave
        this.key = this.add.image(30, 400, 'key');
        this.key.setScale(0.4, 0.4);
        this.key.setVisible(false);
    }

    update(){
        let self = this;
        this.barra.x -= this.fireBurnSpeed;
        this.fireBarra.x -= this.fireBurnSpeed;
        if(this.fireBarra.x <= 5 && this.hasLight){
            this.hasLight = false;
            //this.torchEnd();
            this.scene.get(self.levelScene).torchEnd();
        }

        this.pauseButton.setVisible(true);
        
        if(this.p.isDown ){ // Comprobamos si pulsamos P
            this.pauseButton.setVisible(false);
			this.scene.pause(self.levelScene);
            self.scene.pause(this);
            this.scene.launch('PauseScene');
		};
    }

    sumaFire(){
        // suma relleno barra
        this.barra.x += 70;
        var result = Phaser.Math.Clamp(this.barra.x, 5, 49);
        this.barra.x = result;

        // suma fuego barra
        this.fireBarra.x += 70;
        var result = Phaser.Math.Clamp(this.fireBarra.x, 5, 112);
        this.fireBarra.x = result;
    }

    showKey(){
        this.key.setVisible(true);
    }

    getHasLight(){
        return this.hasLight;
    }
}
