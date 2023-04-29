import { Player } from "./Player";

export class Sword {
    public x: number;
    public y: number;
    public angle: number;
    public image: HTMLImageElement;
    public speed: number;
    public damage: number;
    private damageDealt: boolean = false;

    constructor (x: number, y: number, angle: number, damage: number) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.image = new Image();
        this.image.src = `./images/bosses/stage_1/sword.png`;
        this.speed = 10;
        this.damage = damage;
    }

    public move (player: Player) {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (Math.abs(this.x - player.x - 40) <= 30 && Math.abs(this.y - player.y - 40) <= 50 && !this.damageDealt) {
            if (!player.cheating) {
                player.hp -= this.damage;
                this.damageDealt = true;
            };
        };
    }

    public draw (ctx: CanvasRenderingContext2D | null, player: Player) {
        if (!ctx) {
            return;
        }
        ctx.translate(this.x - player.x + player.shownx, this.y - player.y + player.showny);
        ctx.rotate(this.angle + 3 * Math.PI / 4);
        ctx.drawImage(this.image, -16, -16);
        ctx.rotate(-this.angle - 3 * Math.PI / 4);
        ctx.translate(-1 * (this.x - player.x + player.shownx), -1 * (this.y - player.y + player.showny));
    }
};