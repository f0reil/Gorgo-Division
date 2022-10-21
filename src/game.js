import mainLevel from './escenas/mainLevel.js'
let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById("Canvas"),
    width:  656,
    height: 376,
    pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		// Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
		// con un mínimo y un máximo de tamaño
		mode: Phaser.Scale.FIT,
		min: {
            width: 328,
            height: 188
        },
		max: {
            width: 1312,
            height: 752
        },
		zoom: 1
    },
    
    scene: [mainLevel],
    title: "Prueba de concepto",
    version: "1.0.0",
};

new Phaser.Game(config);
