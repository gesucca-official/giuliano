class Fight extends Phaser.Scene {

    platforms;
    movingPlatform;
    warps = {
        w1:
            {g: null, h: null},
        w2:
            {g: null, h: null},
        w3:
            {g: null, h: null}
    };

    constructor() {
        super('Fight');
    }

    init() {
        console.log('scene fight')
    }

    preload() {
        this.load.image('bkg', 'assets/hyperspace_bkg.jpg');
        this.load.image('ground', 'assets/hyperspace_ground.png');
        this.load.image('warp', 'assets/hyperspace_warp.png');
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

        const movingPlatformMaxX = this.textures.get('bkg').getSourceImage().width
            - this.textures.get('ground').getSourceImage().width * 0.75
            - 20;
        if (this.movingPlatform.x >= movingPlatformMaxX) {
            this.movingPlatform.setVelocityX(-120);
        } else if (this.movingPlatform.x <= 20) {
            this.movingPlatform.setVelocityX(120);
        }
    }

    _createGround() {
        this.platforms = this.physics.add.staticGroup();
        let y = this.textures.get('bkg').getSourceImage().height - this.textures.get('ground').getSourceImage().height
        let w = this.textures.get('ground').getSourceImage().width;
        let ww = this.textures.get('warp').getSourceImage().width * 0.75;
        let bw = this.textures.get('bkg').getSourceImage().width;

        let lastX = 0
        for (let x = -120; x < bw / 6; x += w) {
            this.platforms.create(x, y, 'ground').setOrigin(0, 0);
            lastX = x;
        }
        lastX += w;
        this.warps.w1.g = this.add.image(lastX, y - 10, 'warp').setOrigin(0, 0).setScale(0.75);
        for (let x = lastX + ww; x < bw / 2; x += w) {
            this.platforms.create(x, y, 'ground').setOrigin(0, 0);
            lastX = x;
        }
        lastX += w;
        this.warps.w2.g = this.add.image(lastX, y - 10, 'warp').setOrigin(0, 0).setScale(0.75);
        for (let x = lastX + ww; x < bw / 1.5; x += w) {
            this.platforms.create(x, y, 'ground').setOrigin(0, 0);
            lastX = x;
        }
        lastX += w;
        this.warps.w3.g = this.add.image(lastX, y - 10, 'warp').setOrigin(0, 0).setScale(0.75);
        for (let x = lastX + ww; x < bw; x += w) {
            this.platforms.create(x, y, 'ground').setOrigin(0, 0);
        }
    }

    _createMovingPlatform() {
        this.movingPlatform = this.physics.add.image(20, 10, 'ground').setOrigin(0, 0).setScale(0.75, 0.5)
        this.movingPlatform.setImmovable(true);
        this.movingPlatform.body.allowGravity = false;
    }

}

export default Fight;
