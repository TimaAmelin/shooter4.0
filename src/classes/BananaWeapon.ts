import { Banana } from './Banana';
import { Player } from "./Player";

export class BananaWeapon {
    public skinName: string;
    public orientation: 'left' | 'right';
    private skinLeft: HTMLImageElement;
    private skinRight: HTMLImageElement;
    public shownx: number;
    public showny: number;
    public angle: number;

    constructor () {
        this.skinName = 'BananaGun';
        this.orientation = 'right';
        this.shownx = 375;
        this.showny = 275;
        this.angle = 0;
        this.skinLeft = new Image();
        this.skinLeft.src = `./images/funny_weapons/${this.skinName} left.png`;
        this.skinRight = new Image();
        this.skinRight.src = `./images/funny_weapons/${this.skinName} right.png`;
    }

    public draw (ctx: CanvasRenderingContext2D | null, player: Player, banana: Banana) {
        if (!ctx) return;
        this.angle = Math.atan((banana.cursor.y - banana.y - 55) / (banana.cursor.x - banana.x - 30));
        console.log(banana.cursor, player.x, player.y, this.angle / Math.PI * 180)
    
        const skin = banana.x > player.x ? this.skinLeft : this.skinRight;
    
        ctx.translate(banana.x - player.x + player.shownx + 47, banana.y - player.y + player.showny + 70);
        ctx.rotate(this.angle);
        ctx.drawImage(skin, -32, -26);
        ctx.rotate(-this.angle);
        ctx.translate(-1 * (banana.x - player.x + player.shownx) - 47, -1 * (banana.y - player.y + player.showny) - 70);
    }
};