import { Player } from "./Player";

export class Mine {
    public x: number;
    public y: number;
    public xAim: number;
    public yAim: number;
    public angle: number;
    public image: HTMLImageElement;
    public explosionImage: HTMLImageElement;
    public speed: number;
    public damage: number;
    private damageDealt: boolean = false;
    private placed: boolean = false;
    private explosionTimer: number = 50;

    constructor (x: number, y: number, xAim: number, yAim: number, angle: number, damage: number) {
        this.x = x;
        this.y = y;
        this.xAim = xAim;
        this.yAim = yAim;
        this.angle = angle;
        this.image = new Image();
        this.image.src = `./images/bosses/stage_2/mine.png`;
        this.explosionImage = new Image();
        this.explosionImage.src = `./images/bosses/stage_2/explosion.png`;
        this.speed = 5;
        this.damage = damage;
    }

    private move () {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (Math.abs(this.x - this.xAim) <= 10 && Math.abs(this.y - this.yAim) <= 10) {
            this.placed = true;
        };
    }

    private checkPlayer (player: Player) {
        if (Math.abs(this.x - player.x - 33) <= 30 && Math.abs(this.y - player.y - 70) <= 30 && !this.damageDealt) {
            this.damageDealt = true;
            player.hp -= this.damage;
        };
    }

    public work (player: Player) {
        if (this.placed) {
            this.checkPlayer(player);
        } else {
            this.move();
        }
    }

    public draw (ctx: CanvasRenderingContext2D | null, player: Player) {
        if (!ctx || this.explosionTimer < 0) {
            return;
        }
        if (this.damageDealt) {
            this.explosionTimer--;
            ctx.drawImage(this.explosionImage, this.x - player.x + player.shownx - 23, this.y - player.y + player.showny - 27);
            return;
        }
        ctx.drawImage(this.image, this.x - player.x + player.shownx, this.y - player.y + player.showny);
    }
};