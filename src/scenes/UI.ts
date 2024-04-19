import BoxInterract from "../assets/interactiveBox/BoxInterract";
import { GameData } from "../GameData";
import GamePlay from "./GamePlay";

export default class UI extends Phaser.Scene{
    constructor() {
        super({
          key: "UI",
        });
    }

    private gamePlay: GamePlay;

    private changeRoomBox: BoxInterract[] = [];

    private centerX = 1920/2;
    private centerY = 1080/2;

    preload()
    {
        this.changeRoomBox= [new BoxInterract, new BoxInterract]
        //console.log(this.changeRoomBox
    }

    create()
    {

        this.changeRoomBox[0].BoxInterract(this.scene.scene, this.centerX-600, this.centerY, 5, 0);
        this.changeRoomBox[1].BoxInterract(this.scene.scene, this.centerX+600, this.centerY, 5, 0);
        this.changeRoomBox[0].getDecor().flipY = true;
        
        this.changeRoomBox.forEach(element => {
            element.setTitleText("Change Room?");
            element.setOptions("Yes", "No")
        });


        this.gamePlay = <GamePlay>this.scene.get("GamePlay");
    }

    update(time: number, delta: number): void
    {   
        this.gamePlay.events.on("in", (player: Phaser.Physics.Arcade.Sprite) => {this.changeRoom(player, this.changeRoomBox)} );
        this.gamePlay.events.on("out", () => {this.HideBoxes(this.changeRoomBox)});
    }

    HideBoxes(changeRoomBox: BoxInterract[])
    {
        changeRoomBox.forEach(box => {
            box.setAlpha(0);
        })
    }

    changeRoom(player: Phaser.Physics.Arcade.Sprite, changeRoomBox: BoxInterract[])
    {
        if(player.anims.currentAnim.key == "walkLeft" && this.changeRoomBox[1].getDecor().alpha == 0)
        {
            this.changeRoomBox[0].setAlpha(1);
        }
        else if(player.anims.currentAnim.key == "walkRight" && this.changeRoomBox[0].getDecor().alpha == 0)
        {
            this.changeRoomBox[1].setAlpha(1);
        }

        if(this.changeRoomBox[0].getDecor().alpha == 1)
        {
            this.changeRoomBox[0].selection();
        }
        else if(this.changeRoomBox[1].getDecor().alpha == 1)
        {
            this.changeRoomBox[1].selection();
        }
    }

}