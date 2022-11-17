import Title from "./scenes/title.js";
import Fight from "./scenes/fight.js";

const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: [Fight, Title]
};

const game = new Phaser.Game(config);
