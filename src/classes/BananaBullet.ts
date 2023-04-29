import { Player } from "./Player";
import { Rooms } from "./Rooms";

export class BananaBullet {
    public x: number;
    public y: number;
    public angle: number;
    public image: HTMLImageElement;
    public speed: number;
    public distance: number;
    public damage: number;

    constructor (x: number, y: number, angle: number, image: string, damage: number) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.image = new Image();
        this.image.src = `./images/${image}.png`;
        this.speed = 10;
        this.distance = 30;
        this.damage = damage;
    }

    public move (rooms: Rooms, player: Player) {
        if (this.distance > 0) {
            if (rooms.isLegalPlace(this.x + Math.cos(this.angle) * this.speed - 23, this.y + Math.sin(this.angle) * this.speed - 40) ||
            rooms.isLegalPlace(this.x + Math.cos(this.angle) * this.speed - 80, this.y + Math.sin(this.angle) * this.speed - 70)) {
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                if (Math.abs(this.x - player.x - 50) <= 30 && Math.abs(this.y - player.y - 50) <= 50 && this.distance > 0) {
                    player.hp -= this.damage;
                    this.distance = 0;
                };
                this.distance--;
            } else {
                this.distance = 0;
            };
        }
    }

    public draw (ctx: CanvasRenderingContext2D | null, player: Player) {
        if (this.distance > 0) {
            ctx && ctx.drawImage(this.image, this.x - player.x + player.shownx, this.y - player.y + player.showny);
        }
    }
};