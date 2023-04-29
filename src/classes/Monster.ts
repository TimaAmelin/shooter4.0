import { monsterStats } from "../types/gameTypes";
import { Player } from "./Player";
import { Rooms } from "./Rooms";

export class Monster {
    private skinName: string;
    private orientation: 'left' | 'right';
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
        this.skinLeft.src = `./images/monsters/${stage}/${this.skinName} left.png`;
        this.skinRight = new Image();
        this.skinRight.src = `./images/monsters/${stage}/${this.skinName} right.png`;
        this.skin = this.orientation === 'left' ? this.skinLeft : this.skinRight;
        this.x = x;
        this.y = y;
        this.speed = monsterType.speed;
        this.alive = true;
        this.health = monsterType.hp;
        this.maxHealth = monsterType.hp;
        this.damage = monsterType.damage;
        this.stunTimer = 0;
        this.stunTime = monsterType.hp;
        this.angle = 0;
        this.angleTimer = 20;
    }

    private isPlayerSeen (rooms: Rooms, player: Player) {
        return (
            (
                rooms.isInRoom1(this.x, this.y) &&
                (
                    rooms.isInRoom1(player.x, player.y) ||
                    rooms.isOnBridge1(player.x, player.y) ||
                    rooms.isOnBridge5(player.x, player.y)
                )
            ) ||
            (
                rooms.isInRoom2(this.x, this.y) &&
                (
                    rooms.isInRoom2(player.x, player.y) ||
                    rooms.isOnBridge1(player.x, player.y) ||
                    rooms.isOnBridge2(player.x, player.y)
                )
            ) ||
            (
                rooms.isInRoom3(this.x, this.y) &&
                (
                    rooms.isInRoom3(player.x, player.y) ||
                    rooms.isOnBridge2(player.x, player.y) ||
                    rooms.isOnBridge3(player.x, player.y)
                )
            ) ||
            (
                rooms.isInRoom4(this.x, this.y) &&
                (
                    rooms.isInRoom4(player.x, player.y) ||
                    rooms.isOnBridge5(player.x, player.y) ||
                    rooms.isOnBridge4(player.x, player.y)
                )
            ) ||
            (
                rooms.isInRoom5(this.x, this.y) &&
                (
                    rooms.isInRoom5(player.x, player.y) ||
                    rooms.isOnBridge4(player.x, player.y) ||
                    rooms.isOnBridge3(player.x, player.y)
                )
            ) ||
            (
                rooms.isOnBridge1(this.x, this.y) &&
                (
                    rooms.isInRoom1(player.x, player.y) ||
                    rooms.isInRoom2(player.x, player.y) ||
                    rooms.isOnBridge1(player.x, player.y)
                )
            ) ||
            (
                rooms.isOnBridge2(this.x, this.y) &&
                (
                    rooms.isInRoom2(player.x, player.y) ||
                    rooms.isInRoom3(player.x, player.y) ||
                    rooms.isOnBridge2(player.x, player.y)
                )
            ) ||
            (
                rooms.isOnBridge3(this.x, this.y) &&
                (
                    rooms.isInRoom3(player.x, player.y) ||
                    rooms.isInRoom5(player.x, player.y) ||
                    rooms.isOnBridge3(player.x, player.y)
                )
            ) ||
            (
                rooms.isOnBridge4(this.x, this.y) &&
                (
                    rooms.isInRoom4(player.x, player.y) ||
                    rooms.isInRoom5(player.x, player.y) ||
                    rooms.isOnBridge4(player.x, player.y)
                )
            ) ||
            (
                rooms.isOnBridge5(this.x, this.y) &&
                (
                    rooms.isInRoom4(player.x, player.y) ||
                    rooms.isInRoom1(player.x, player.y) ||
                    rooms.isOnBridge5(player.x, player.y)
                )
            )
        )
    }

    public move (rooms: Rooms, player: Player) {
        if (this.stunTimer === 0) {
            if (this.isPlayerSeen(rooms, player) && !player.cheating) {
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
                if (Math.abs(this.x - player.x) <= 30 && Math.abs(this.y - player.y) <= 50 && this.alive) {
                    if (!player.cheating) {
                        player.hp -= this.damage;
                    } else {
                        this.alive = false;
                        player.score += 1;
                    };
                    this.stunTimer = this.stunTime;
                };
            }
        } else {
            this.stunTimer--;
        }
    }
};