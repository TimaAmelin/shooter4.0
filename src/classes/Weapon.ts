import { Cursor } from "./Cursor";
import { Player } from "./Player";

export class Weapon {
    public skinName: string;
    public orientation: 'left' | 'right';
    private skinLeft: HTMLImageElement;
    private skinRight: HTMLImageElement;
    public shownx: number;
    public showny: number;
    public angle: number;

    constructor () {
        this.skinName = 'Alena';
        this.orientation = 'right';
        this.shownx = 375;
        this.showny = 275;
        this.angle = 0;
        this.skinLeft = new Image();
        this.skinLeft.src = `./images/funny_weapons/${this.skinName} left.png`;
        this.skinRight = new Image();
        this.skinRight.src = `./images/funny_weapons/${this.skinName} right.png`;
    }

    public draw (ctx: CanvasRenderingContext2D | null, player: Player, cursor: Cursor) {
        if (!ctx) return;
        this.angle = Math.atan((cursor.y - player.showny - 55) / (cursor.x - player.shownx - 30));
    
        const skin = this.orientation === 'left' ? this.skinLeft : this.skinRight;
    
        ctx.translate(player.shownx + 47, player.showny + 74);
        ctx.rotate(this.angle);
        ctx.drawImage(skin, -32, -26);
        ctx.rotate(-this.angle);
        ctx.translate(-1 * player.shownx - 47, -1 * player.showny - 74);
    }
};