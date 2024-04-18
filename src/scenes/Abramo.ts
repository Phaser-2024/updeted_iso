import { Collision } from "matter";
import { Scene, Scenes } from "phaser";
import { GameData } from "../GameData";
import Map from "../assets/map/Map";
import UI from "./UI";

export default class GamePlay extends Phaser.Scene {
  constructor() {
    super({
      key: "Abramo",
    });
  }

  private d: Phaser.Input.Keyboard.Key;
  private a: Phaser.Input.Keyboard.Key;
  private w: Phaser.Input.Keyboard.Key;
  private s: Phaser.Input.Keyboard.Key;

  private map: Map[] = [];
  private levelMask: Phaser.GameObjects.Image;
  private rectangle: Phaser.GameObjects.Rectangle;
  private triggerArea: Phaser.Physics.Arcade.Image;

  private player: Phaser.Physics.Arcade.Sprite;
  private abramo: Phaser.Physics.Arcade.Sprite;

  private overlap: boolean = false;
  private isPressing: boolean = false;

  private centerX = 1920 / 2;
  private centerY = 1080 / 2;

  init(data: UI) {
    //movement key
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    this.map = [new Map(), new Map(), new Map()];
  }

  create() {
    this.cameras.main.setBackgroundColor("#000000");

    this.player = this.physics.add
      .sprite(this.centerX - 96, this.centerY - 24, "playerSprite")
      .setScale(3)
      .setDepth(2);

    this.CreateAnimation();

    this.rectangle = this.add
      .rectangle(this.centerX, this.centerY, 1200, 800)
      .setStrokeStyle(3, 0xffffff);
    this.player.setCollideWorldBounds(true);
    this.physics.world.setBounds(
      this.rectangle.x - this.rectangle.width / 2,
      this.rectangle.y - this.rectangle.height / 2,
      this.rectangle.width,
      this.rectangle.height
    );
    this.physics.add.collider(this.player, null, null, null, this);

    //abramo
    this.abramo = this.physics.add
      .sprite(this.centerX + 200, this.centerY - 150, "AbramoSprite")
      .setScale(3)
      .setDepth(2)
      .setFrame(7);

    this.triggerArea = this.physics.add.image(
        this.centerX + (this.centerX * 35) / 100,
        this.centerY,
        "coll"
      ).setScale(15).setAlpha(0);
    this.physics.add.collider(this.triggerArea, null, null, null, this);
  }

  update(time: number, delta: number): void {
    this.Movement();
    this.PlayerAnimations();

    if (this.physics.overlap(this.player, this.triggerArea)) {
      this.overlap = true;
        console.log("ciao");
        
      this.abramoAnimation()
      this.triggerArea.destroy()

    } 
  }

  Movement() {
    if (this.d.isDown) {
      this.player.x += 6;
      this.player.y -= 3;
    } else if (this.a.isDown) {
      this.player.x -= 6;
      this.player.y += 3;
    } else if (this.w.isDown) {
      this.player.x -= 6;
      this.player.y -= 3;
    } else if (this.s.isDown) {
      this.player.x += 6;
      this.player.y += 3;
    }
  }

  CreateAnimation() {
    if (!this.anims.exists("walkRight")) {
      this.anims.create({
        key: "walkRight",
        frames: this.anims.generateFrameNumbers("playerSprite", {
          frames: [0, 1, 2, 3, 4, 5],
        }),
        frameRate: 6,
        yoyo: false,
        repeat: -1,
      });
    }

    if (!this.anims.exists("walkLeft")) {
      this.anims.create({
        key: "walkLeft",
        frames: this.anims.generateFrameNumbers("playerSprite", {
          frames: [6, 7, 8, 9, 10, 11],
        }),
        frameRate: 6,
        yoyo: false,
        repeat: -1,
      });
    }

    if (!this.anims.exists("walkUp")) {
      this.anims.create({
        key: "walkUp",
        frames: this.anims.generateFrameNumbers("playerSprite", {
          frames: [0, 1, 2, 3, 4, 5],
        }),
        frameRate: 6,
        yoyo: false,
        repeat: -1,
      });
    }

    if (!this.anims.exists("idle")) {
      this.anims.create({
        key: "idle",
        frames: this.anims.generateFrameNumbers("playerSprite", {
          frames: [5],
        }),
        frameRate: 6,
        yoyo: false,
        repeat: -1,
      });
    }

    /*

    this.anims.create({
      key: "walkLeft",
      frames: this.anims.generateFrameNumbers("playerSprite", { frames: [6,7,8,9,10,11] }),
      frameRate: 6,
      yoyo: false,
      repeat: -1
    });*/
  }

  PlayerAnimations() {
    if (this.isPressing) {
    } else {
      this.player.play("idle", true);
    }
  }

  abramoAnimation(){
    console.log("ciao");
    
  }
}
