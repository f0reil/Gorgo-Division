import Player from './characters/Player.js'
import Enemy from './characters/Enemy.js'
import mainLevel from './scenes/mainLevel.js'
import YouDied from './scenes/YouDied.js'
let game;
 
window.onload = function() {
    let gameConfig = {
        type: Phaser.CANVAS,
        canvas: document.getElementById("Canvas"),
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 600,
            height: 440
        },
        scene: [mainLevel, YouDied],
        physics: { 
            default: 'arcade', 
            arcade: { 
                gravity: { y: 0 }, 
                debug: false
            },
            checkCollision: {
                up: true,
                down: true,
                left: true,
                right: true
            }
        },
       
       
    }
    
    game = new Phaser.Game(gameConfig);
}



