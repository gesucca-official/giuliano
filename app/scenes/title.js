class Title extends Phaser.Scene {

    constructor() {
        super('Title');
    }

    init() {
        console.log('scene title')
        this.cursors = this.input.keyboard.createCursorKeys()
        this.mainMenuButtons = [];
        this.selectedMainMenuButtonIndex = 0;
        this.subMenuButtons = [];
        this.selectedSubMenuButtonIndex = 0;
        this.isSubMenuActive = false;
    }

    preload() {
    }

    create(data) {
        this._createMainMenu();
    }

    update(time, delta) {
        const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
        const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down)
        const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)

        if (upJustPressed) {
            if (this.isSubMenuActive)
                this._selectNextSubMenuButton(-1)
            else
                this._selectNextMainMenuButton(-1)
        } else if (downJustPressed) {
            if (this.isSubMenuActive)
                this._selectNextSubMenuButton(1)
            else
                this._selectNextMainMenuButton(1)
        } else if (spaceJustPressed) {
            if (this.isSubMenuActive)
                this._confirmSubMenuSelection()
            else
                this._confirmMainMenuSelection()
        }
    }

    _createMainMenu() {
        const playBtn = this.add.text(100, 100, 'Play')
        const settBtn = this.add.text(100, 150, 'Settings')
        const exitBtn = this.add.text(100, 200, 'Exit')
        this.mainMenuButtons.push(playBtn)
        this.mainMenuButtons.push(settBtn)
        this.mainMenuButtons.push(exitBtn)

        playBtn.on('selected', () => {
            this._createPlaySubMenu()
        })
        settBtn.on('selected', () => {
            console.log('settings')
        })
        exitBtn.on('selected', () => {
            console.log('exit')
        })

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            playBtn.off('selected');
            settBtn.off('selected');
            exitBtn.off('selected');
        })

        this._selectMainMenuButton(0)
    }

    _createPlaySubMenu() {
        const dungeonsBtn = this.add.text(200, 100, 'Dungeons')
        const buildPgBtn = this.add.text(200, 150, 'Build Pg')
        const pvmBtn = this.add.text(200, 200, 'PvM')
        const pvcomBtn = this.add.text(200, 250, 'PvCom')
        const pvpBtn = this.add.text(200, 300, 'PvP')
        const backBtn = this.add.text(200, 350, 'Back')
        this.subMenuButtons.push(dungeonsBtn)
        this.subMenuButtons.push(buildPgBtn)
        this.subMenuButtons.push(pvmBtn)
        this.subMenuButtons.push(pvcomBtn)
        this.subMenuButtons.push(pvpBtn)
        this.subMenuButtons.push(backBtn)

        pvcomBtn.on('selected', () => {
            this.scene.des
            this.scene.start('Fight')
        })

        backBtn.on('selected', () => {
            this._destroySubMenu()
        })

        this.isSubMenuActive = true;
        this._selectSubMenuButton(0)
    }

    _destroySubMenu() {
        this.isSubMenuActive = false;
        this.subMenuButtons.forEach(b => b.destroy())
        this.subMenuButtons = [];
    }

    _selectMainMenuButton(index) {
        const currentButton = this.mainMenuButtons[this.selectedMainMenuButtonIndex]
        currentButton.setTint(0xffffff)
        const button = this.mainMenuButtons[index]
        button.setTint(0x66ff7f)
        this.selectedMainMenuButtonIndex = index
    }

    _selectSubMenuButton(index) {
        const currentButton = this.subMenuButtons[this.selectedSubMenuButtonIndex]
        currentButton.setTint(0xffffff)
        const button = this.subMenuButtons[index]
        button.setTint(0x66ff7f)
        this.selectedSubMenuButtonIndex = index
    }

    _selectNextMainMenuButton(change = 1) {
        let index = this.selectedMainMenuButtonIndex + change
        // wrap the index to the front or end of array
        if (index >= this.mainMenuButtons.length) {
            index = 0
        } else if (index < 0) {
            index = this.mainMenuButtons.length - 1
        }
        this._selectMainMenuButton(index)
    }

    _selectNextSubMenuButton(change = 1) {
        let index = this.selectedSubMenuButtonIndex + change
        // wrap the index to the front or end of array
        if (index >= this.subMenuButtons.length) {
            index = 0
        } else if (index < 0) {
            index = this.subMenuButtons.length - 1
        }
        this._selectSubMenuButton(index)
    }

    _confirmMainMenuSelection() {
        const button = this.mainMenuButtons[this.selectedMainMenuButtonIndex]
        button.emit('selected')
    }

    _confirmSubMenuSelection() {
        const button = this.subMenuButtons[this.selectedSubMenuButtonIndex]
        button.emit('selected')
    }
}

export default Title;
