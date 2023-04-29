import { monsterStats } from "../types/gameTypes";
import { Player } from "./Player";
import { Rooms } from "./Rooms";

export class Boss {
    private skinName: string;
    public orientation: 'left' | 'right';
    public skinLeft: HTMLImageElement;
    public skinRight: HTMLImageElement;
    public skin: HTMLImageElement;
    public x: number;
    public y: number;
    private speed: number;
    public alive: boolean;
    public health: number;
    public maxHealth: number;
    public damage: number;
    public stunTimer: number;
    public stunTime: number;
    private angle: number;
    private angleTimer: number;

    constructor (
        monsterType: monsterStats,
        stage: string,
        x: number,
        y: number,
        orientation: 'left' | 'right'
    ) {
        this.skinName = monsterType.name;
        this.orientation = orientation;
        this.skinLeft = new Image();
        this.skinLeft.src = `./images/bosses/${stage}/${this.skinName} left.png`;
        this.skinRight = new Image();
        this.skinRight.src = `./images/bosses/${stage}/${this.skinName} right.png`;
        this.skin = this.orientation === 'left' ? this.skinLeft : this.skinRight;
        this.x = x;
        this.y = y;
        this.speed = monsterType.speed;
        this.alive = true;
        this.health = monsterType.hp;
        this.maxHealth = monsterType.hp;
        this.damage = monsterType.damage;
        this.stunTimer = 0;
        this.stunTime = monsterType.hp / 50;
        this.angle = 0;
        this.angleTimer = 20;
    }

    public move (rooms: Rooms, player: Player) {
        if (this.stunTimer === 0) {
            if (!player.cheating) {
                let angle = Math.atan((player.y - this.y) / (player.x - this.x));
                if (player.x < this.x) {
                    angle += Math.PI;
                    this.skin = this.skinLeft;
                } else {
                    this.skin = this.skinRight;
                }
                if (rooms.isLegalPlace(this.x + this.speed * Math.cos(angle), this.y)) {
                    this.x += this.speed * Math.cos(angle);
                };
                if (rooms.isLegalPlace(this.x, this.y + this.speed * Math.sin(angle))) {
                    this.y += this.speed * Math.sin(angle);
                };
                if (Math.abs(this.x - player.x) <= 30 && Math.abs(this.y - player.y) <= 50 && this.alive) {
                    if (!player.cheating) {
                        player.hp -= this.damage;
                    } else {
                        this.alive = false;
                        player.score += 1;
                    };
                    this.stunTimer = this.stunTime;
                };
            } else {
                let bumped = false;
                if (this.angleTimer <= 0) {
                    this.angle = Math.random() * Math.PI * 2;
                    if (this.angle < Math.PI / 2 || this.angle > 1.5 * Math.PI) {
                        this.orientation = 'right';
                        this.skin = this.skinRight;
                    } else {
                        this.orientation = 'left';
                        this.skin = this.skinLeft;
                    }
                    this.angleTimer = Math.floor(Math.random() * 100 + 50);
                } else {
                    this.angleTimer--;
                }
                if (rooms.isLegalPlace(this.x + this.speed * Math.cos(this.angle), this.y)) {
                    this.x += this.speed * Math.cos(this.angle);
                } else {
                    bumped = true;
                };
                if (rooms.isLegalPlace(this.x, this.y + this.speed * Math.sin(this.angle))) {
                    this.y += this.speed * Math.sin(this.angle);
                } else {
                    bumped = true;
                };
                if (bumped) {
                    this.angleTimer = 0;
                };
            }
        } else {
            this.stunTimer--;
        }
    };

    public draw (player: Player, ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.skin, this.x - player.x + player.shownx, this.y - player.y + player.showny);
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x - player.x + player.shownx - 6, this.y - player.y + player.showny - 25, 106, 20);
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - player.x + player.shownx - 3, this.y - player.y + player.showny - 22, this.health / this.maxHealth * 100, 14);
    }
};