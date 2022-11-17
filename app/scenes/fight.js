class Fight extends Phaser.Scene {

    constructor() {
        super('Fight');
    }

    init() {
        console.log('scene fight')
    }

    preload() {
        this.load.image('bkg', 'assets/hyperspace_bkg.jpg');
        this.load.image('ground', 'assets/hyperspace_ground.png');
    }

    create(data) {
        this.add.image(0, 0, 'bkg').setOrigin(0, 0);
        this._createGround();
        this._createMovingPlatform();
    }

    update(time, delta) {
        const escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        if (escape.isDown)
            this.scene.start('Title')

        if (this.movingPlatform.x >= 500) {
            this.movingPlatform.setVelocityX(-50);
        } else if (this.movingPlatform.x <= 300) {
            this.movingPlatform.setVelocityX(50);
        }
    }

    _createGround() {
        this.platforms = this.physics.add.staticGroup();
        let y = this.textures.get('bkg').getSourceImage().height - this.textures.get('ground').getSourceImage().height
        let w = this.textures.get('ground').getSourceImage().width;
        for (let x = 0; x < this.textures.get('bkg').getSourceImage().width; x += w) {
            this.platforms.create(x, y, 'ground').setOrigin(0, 0);
        }
    }

    _createMovingPlatform() {
        this.movingPlatform = this.physics.add.image(400, 400, 'ground');
        this.movingPlatform.setImmovable(true);
        this.movingPlatform.body.allowGravity = false;
        this.movingPlatform.setVelocityX(50);
    }
}

export default Fight;
