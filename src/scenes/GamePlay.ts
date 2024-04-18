import { Collision } from "matter";
import { Scene, Scenes } from "phaser";
import { GameData } from "../GameData";
import Map from "../assets/map/Map";
import UI from "./UI";

export default class GamePlay extends Phaser.Scene {
  constructor() {
    super({
      key: "GamePlay",
    });
  }

  private d: Phaser.Input.Keyboard.Key;
  private a: Phaser.Input.Keyboard.Key;

  private map: Map[] = [];
  private levelMask: Phaser.GameObjects.Image;

  private player: Phaser.Physics.Arcade.Sprite;

  private overlap: boolean = false;
  private isPressing: boolean = false;

  
  private centerX = 1920/2;
  private centerY = 1080/2;


  init(data: UI) 
  {
    //movement key
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

    this.map = [new Map, new Map, new Map]
    
  }

  create() 
  {

    this.cameras.main.setBackgroundColor("#000000");

    ///////
    this.map[0].createMap(this.scene.scene, 0, 0, "levelFloor");
    this.map[0].setCollider(this.scene.scene, this.map[0].getImage().x + 415*3, this.map[0].getImage().y + 144*3);

    ///////

    this.levelMask = this.add.sprite(0, 0, "levelMask").setOrigin(0, 0).setScale(3).setAlpha(1).setDepth(5);

    this.player = this.physics.add.sprite(this.centerX-96, this.centerY-24, "playerSprite").setScale(3).setDepth(2);

    this.CreateAnimation();
    //this.player.play("walk", true)
  }

  update(time: number, delta: number): void 
  {
    this.Movement();
    this.PlayerAnimations();

    //overlap
    if(this.physics.overlap(this.player, this.map[0].getColliders()))
    {
      this.overlap = true;
      this.events.emit("in", this.player);
    }
    else if(this.overlap)
    {
      this.overlap = false;
      this.events.emit("out")
    }

  }

  Movement()
  {
    if(this.d.isDown)
    {
      this.map[0].MoveRight(6, 3);
      this.isPressing = true;
    }
    else if(this.a.isDown)
    {
      this.map[0].MoveLeft(6, 3);
      this.isPressing = true;
    }
    else
    {
      this.isPressing = false;
    }
  }

  CreateAnimation()
  {
    if(!this.anims.exists("walkRight"))
    {
      this.anims.create({
        key: "walkRight",
        frames: this.anims.generateFrameNumbers("playerSprite", { frames: [0,1,2,3,4,5] }),
        frameRate: 6,
        yoyo: false,
        repeat: -1
      });
    }

    if(!this.anims.exists("walkLeft"))
    {
      this.anims.create({
        key: "walkLeft",
        frames: this.anims.generateFrameNumbers("playerSprite", { frames: [6,7,8,9,10,11] }),
        frameRate: 6,
        yoyo: false,
        repeat: -1
      });
    }

    if(!this.anims.exists("idle"))
    {
      this.anims.create({
        key: "idle",
        frames: this.anims.generateFrameNumbers("playerSprite", { frames: [5] }),
        frameRate: 6,
        yoyo: false,
        repeat: -1
      });
    }

/*

    this.anims.create({
      key: "walkLeft",
      frames: this.anims.generateFrameNumbers("playerSprite", { frames: [6,7,8,9,10,11] }),
      frameRate: 6,
      yoyo: false,
      repeat: -1
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("playerSprite", { frames: [0] }),
      frameRate: 6,
      yoyo: false,
      repeat: -1
    });*/

  }

  PlayerAnimations()
  {
    if(this.isPressing)
    {
      if(this.d.isDown)
      {
        this.player.play("walkRight", true);
      }
      else if(this.a.isDown)
      {
        this.player.play("walkLeft", true);
      }

    }
    else
    { 
      this.player.play("idle", true);
    }
  }
}
