import { stats } from "../stats/bossStats";
import { Boss } from "./Boss";
import { BananaBullet } from "./BananaBullet";
import { Player } from "./Player";

export class Banana extends Boss {
    public bullets: BananaBullet[] = [];
    private bulletTimer = 0;
    public name: string = 'banana';
    private memory: {x: number, y: number}[] = [];
    private bulletSkin: string = 'bullet';
    public ammo: number = 10;
    public maxAmmo: number = 10;
    public canShoot: boolean = true;
    public cursor: {x: number, y: number} = {x: 0, y: 0};

    constructor (
        stage: string,
        x: number,
        y: number,
        orientation: 'left' | 'right'
    ) {
        super(stats.stage_3, stage, x, y, orientation);
    }

    public memorize (player: Player) {
        this.memory = [{x: player.x + 30, y: player.y + 55}, ...this.memory.slice(0, 4)];
    }

    public shoot (player: Player) {
        if (this.memory.length === 5) {
            const x_1 = this.memory[0].x;
            const x_2 = this.memory[1].x;
            const x_3 = this.memory[2].x;
            const x_4 = this.memory[3].x;
            const x_5 = this.memory[4].x;
            const y_1 = this.memory[0].y;
            const y_2 = this.memory[1].y;
            const y_3 = this.memory[2].y;
            const y_4 = this.memory[3].y;
            const y_5 = this.memory[4].y;
            const x = 0.49492086 * x_5
                        + 0.90397378 * x_4
                        - 0.73904498 * x_3
                        - 20.48397958 * x_2
                        + 20.79949848 * x_1
                        + 4.82218382 * y_5
                        - 5.45629807 * y_4
                        + 1.97195347 * y_3
                        - 4.82192762 * y_2
                        + 3.50899335 * y_1
            const y = 0.86045067 * x_5
                        - 1.97779787 * x_4
                        + 0.01061088 * x_3
                        + 2.84969749 * x_2
                        - 1.75707783 * x_1
                        + 2.46642159 * y_5
                        - 2.02426279 * y_4
                        - 0.30584152 * y_3
                        - 20.8808067 * y_2
                        + 21.7435057 * y_1
            this.cursor = {x, y};
            if (this.canShoot) {
                if (this.bulletTimer < 0) {
                    
                    let angle = Math.atan((y - this.y - 55) / (x - this.x - 30));
                        
                    if (this.x > player.x) {
                        angle += Math.PI;
                    };
                    if ((player.x - this.x) ** 2 + (player.y - this.y) ** 2 < 120000) {
                        const bananaBullet = new BananaBullet(this.x + 30, this.y + 55, angle, this.bulletSkin, this.damage);
                        this.bullets.push(bananaBullet);
                        this.bulletTimer = 20;
                        this.ammo--;
                        if (this.ammo < 1) {
                            this.canShoot = false;
                        }
                    } else if (this.ammo < 5) {
                        this.canShoot = false;
                    }
                } else {
                    this.bulletTimer--;
                }
            } else {
                this.ammo += this.maxAmmo / 100;
                if (this.ammo > this.maxAmmo) {
                    this.canShoot = true;
                }
            }
        }
    }
}