import mainLevel from './scenes/mainLevel.js'
import Level1 from './scenes/Level1.js'
import YouDied from './scenes/YouDied.js'
import StartMenu from './scenes/StartMenu.js'
import PauseScene from './scenes/PauseScene.js'

window.onload = function() {
    let gameConfig = {
        type: Phaser.WEBGL,
        canvas: document.getElementById("Canvas"),
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 600,
            height: 440
        },
        scene: [StartMenu, Level1, mainLevel, PauseScene, YouDied],
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
    
    const game = new Phaser.Game(gameConfig);
}



