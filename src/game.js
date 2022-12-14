
import IntroScene from './scenes/IntroScene.js'
import Level1 from './scenes/Level1.js'
import Level2 from './scenes/Level2.js'
import Level3 from './scenes/Level3.js'
import Level4 from './scenes/Level4.js'
import YouDied from './scenes/YouDied.js'
import YouWin from './scenes/YouWin.js'
import StartMenu from './scenes/StartMenu.js'
import PauseScene from './scenes/PauseScene.js'
import HUD from './scenes/HUD.js'
import boot from './scenes/boot.js'
import Controls from './scenes/Controls.js'
import Credit from './scenes/Credit.js'
import TopSecret from './scenes/topsecret.js'


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
        scene: [boot, IntroScene, StartMenu, Level1,Level2,Level3,Level4, PauseScene, YouDied, YouWin, Controls, Credit,HUD,TopSecret],
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



