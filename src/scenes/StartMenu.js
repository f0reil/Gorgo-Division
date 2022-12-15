
 export default class StartMenu extends Phaser.Scene {
	constructor(){
		super({key: 'StartMenu'})
	}
	preload(){
    }
    create(){
        var fondo = this.add.image(310,200,'startMenu'); //Imagen de fondo
        var startButton2 = this.add.sprite(490, 70, 'startButton2').setInteractive(); //Botones varios
        var startButton = this.add.sprite(490, 70, 'startButton').setInteractive();
        var controlsButton = this.add.sprite(490, 170, 'ControlsButton').setInteractive();
        var creditsButton = this.add.sprite(490, 270, 'CreditsButton').setInteractive();
        fondo.setScale(1.2, 1.2);
        startButton2.setScale(0.3, 0.3);
        startButton.setScale(0.3, 0.3);
        controlsButton.setScale(0.3, 0.3);
        creditsButton.setScale(0.3, 0.3);
        
        let self = this;
        startButton.on('pointerdown', function(pointer)
        {
            startButton.setVisible(false); //Animación al hacer click en el botón de jugar 
        });

        startButton2.on('pointerup', function(pointer)
        {
            startButton.setVisible(true);
            self.scene.launch('Level1');
            self.scene.stop('StartMenu'); //Se lanza el juego
            mainTheme.stop();
        });
        //Botón de controles
        controlsButton.on('pointerup', function(pointer)
        {
            self.scene.stop('StartMenu');
            mainTheme.stop();
            self.scene.launch('Controls');
            
        });
        //Botón de créditos
        creditsButton.on('pointerup', function(pointer)
        {
            self.scene.stop('StartMenu');
            mainTheme.stop();
            self.scene.launch('Credit');
        });

        const config = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        };
        var mainTheme = this.sound.add("menuSong", config); //Música ambiental del menu
        mainTheme.play();
    }
    
}