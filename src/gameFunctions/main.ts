import { BananaWeapon } from './../classes/BananaWeapon';
import { Bullet } from './../classes/Bullet';
import { BuffPlacer } from './../classes/BuffPlacer';
import { MonsterSummoner } from './../classes/MonsterSummoner';
import { Rooms } from './../classes/Rooms';
import { Background } from './../classes/Background';
import { Cursor } from './../classes/Cursor';
import { Player } from "../classes/Player";
import { Weapon } from "../classes/Weapon";
import { CutScene } from '../classes/CutScene';
import { King } from '../classes/King';
import { Brain } from '../classes/Brain';
import { Banana } from '../classes/Banana';

export const gameStart = (context: CanvasRenderingContext2D | null, canvas: HTMLCanvasElement) => {
    if (!context) return;

    const player = new Player();

    const weapon = new Weapon();

    const bananaWeapon = new BananaWeapon();

    const cursor = new Cursor();

    const backgroundOverlap = new Background('background overlap.png');
    const background = new Background('playingbackground.png');

    const rooms = new Rooms();

    const monsterSummoner = new MonsterSummoner();

    const buffPlacer = new BuffPlacer(player, monsterSummoner);

    const cutScener = new CutScene();

    const banana = new Banana("stage_3", 1000, 2500, "right");

    const cutSceneTime = 3000;

    let pause = false;

    let cutScene = '';

    let cheatCode = [76, 79, 79, 67, 77, 73, 84];

    let stage = 'stage_1';

    let gameEngine: () => void;

    const nextGameStep = (function () {
        return requestAnimationFrame ||
            function (callback) {
                setTimeout(callback, 1000 / 60);
            };
    })();

    const gameEngineStart = (callback: () => void) => {
        gameEngine = callback;
        gameEngineStep();
    };

    const gameEngineStep = () => {
        gameEngine();
        nextGameStep(gameEngineStep);
    };

    const gameLoop = () => {
        if (playing) {
            if (!pause) {
                if (!cutScene) {
                    player.handleMovement(rooms, cheatCode, buffPlacer, isKeyDown);
                    banana.memorize(player);
                    if (!monsterSummoner.boss) {
                        if (stage !== 'stage_4') {
                            monsterSummoner.summon(player, stage as 'stage_1' | 'stage_2' | 'stage_3');
                        }
                    } else {
                        monsterSummoner.boss.move(rooms, player);
                        if (monsterSummoner.boss instanceof King) {
                            monsterSummoner.boss.spawnSword(player);
                            monsterSummoner.boss.moveSwords(player);
                        } else if (monsterSummoner.boss instanceof Brain) {
                            monsterSummoner.boss.spawnMinions(monsterSummoner, rooms);
                            monsterSummoner.boss.spawnMine(rooms);
                            monsterSummoner.boss.mines.map(mine => mine.work(player));
                        } else if (monsterSummoner.boss instanceof Banana) {
                            monsterSummoner.boss.shoot(player);
                            monsterSummoner.boss.bullets.map(bullet => bullet.move(rooms, player));
                        }
                    }
                    monsterSummoner.move(rooms, player);
    
                    buffPlacer.place(player);
                    
                    if (!player.canShoot || player.cheating) {
                        player.ammo += player.maxAmmo / 100;
                        if (player.ammo >= player.maxAmmo) {
                            player.ammo = player.maxAmmo;
                            player.canShoot = true;
                        }
                    }
                
                    if (cursor.x >= player.shownx + 30) {
                        player.orientation = 'right';
                        weapon.orientation = 'right';
                    } else {
                        player.orientation = 'left';
                        weapon.orientation = 'left';
                    };
                
                    background.draw(context, player);
                
                    player.bullets.map(bullet => {
                        if (bullet.distance > 0) {
                            bullet.move(rooms, monsterSummoner, player);
                            bullet.draw(context, player);
                        };
                        return null;
                    });
                    if (monsterSummoner.boss) {
                        if (monsterSummoner.boss instanceof King) {
                            monsterSummoner.boss?.swords.map(sword => sword.draw(context, player));
                        } else if (monsterSummoner.boss instanceof Brain) {
                            monsterSummoner.boss?.mines.map(mine => mine.draw(context, player));
                        } else if (monsterSummoner.boss instanceof Banana) {
                            monsterSummoner.boss?.bullets.map(bullet => bullet.draw(context, player));
                        }
                    }
                    buffPlacer.draw1(context, player);
                    monsterSummoner.draw1(context, player);
                    if (monsterSummoner.boss?.y && monsterSummoner.boss.y < player.y) {
                        monsterSummoner.boss?.draw(player, context);
                        monsterSummoner.draw2(context, player);
                        if (monsterSummoner.boss instanceof Banana) {
                            bananaWeapon.draw(context, player, monsterSummoner.boss)
                        }
                    }
                    player.draw(context);
                    player.drawHP(context);
                    weapon.draw(context, player, cursor);
                    buffPlacer.draw2(context, player);
                    if (monsterSummoner.boss?.y && monsterSummoner.boss.y >= player.y) {
                        monsterSummoner.draw2(context, player);
                        monsterSummoner.boss?.draw(player, context);
                        if (monsterSummoner.boss instanceof Banana) {
                            bananaWeapon.draw(context, player, monsterSummoner.boss)
                        }
                    }
                    monsterSummoner.draw3(context, player);
                    
                    if (!player.cheating) {
                        backgroundOverlap.draw(context, player);
                    };
    
                    if (monsterSummoner.boss && monsterSummoner.boss.health <= 0 && monsterSummoner.boss.name === 'king') {
                        monsterSummoner.boss = undefined;
                        player.hp = player.maxHp;
                        cutScene = '2_1';
                    } else if (monsterSummoner.boss && monsterSummoner.boss.health <= 0 && monsterSummoner.boss.name === 'brain') {
                        monsterSummoner.monsters = [];
                        monsterSummoner.boss = undefined;
                        player.hp = player.maxHp;
                        cutScene = '4_1';
                    } else if (monsterSummoner.boss && monsterSummoner.boss.health <= 0 && monsterSummoner.boss.name === 'banana') {
                        monsterSummoner.monsters = [];
                        monsterSummoner.boss = undefined;
                        player.hp = player.maxHp;
                        cutScene = '6_1';
                    };
                    
                    if (context) {
                        context.fillStyle = 'white';
                        context.font = 'Bold 30px Arial';
                        context.fillText('Score: ' + player.score, 20, 40);
                    };
    
                    if (player.hp <= 0) {
                        playing = false;
                    };
                    
                    if (player.score === 100 && stage === 'stage_1') {
                        stage = 'stage_2';
                        monsterSummoner.monsters = [];
                        const king = new King("stage_1", 1000, 1000, "right");
                        monsterSummoner.boss = king;
                        cutScene = '1_1';
                    } else if (player.score === 200 && stage === 'stage_2') {
                        stage = 'stage_3';
                        monsterSummoner.monsters = [];
                        const brain = new Brain("stage_2", 2800, 2500, "right");
                        monsterSummoner.boss = brain;
                        cutScene = '3_1';
                    } else if (player.score === 300 && stage === 'stage_3') {
                        banana.learn();
                        stage = 'stage_4';
                        monsterSummoner.monsters = [];
                        monsterSummoner.boss = banana;
                        cutScene = '5_1';
                    };
    
                    context && context.drawImage(cursor.image, cursor.x, cursor.y);
                } else {
                    if (cutScene === '1_1') {
                        cutScener.cutScene1_1(context);
                        setTimeout(() => {                            
                            cutScene = '1_2';
                        }, cutSceneTime);
                    } else if (cutScene === '1_2') {
                        cutScener.cutScene1_2(context);
                        setTimeout(() => {                            
                            cutScene = '1_3';
                        }, cutSceneTime);
                    } else if (cutScene === '1_3') {
                        cutScener.cutScene1_3(context);
                        setTimeout(() => {                            
                            cutScene = '1_4';
                        }, cutSceneTime);
                    } else if (cutScene === '1_4') {
                        cutScener.cutScene1_4(context);
                        setTimeout(() => {                            
                            cutScene = '1_5';
                        }, cutSceneTime);
                    } else if (cutScene === '1_5') {
                        cutScener.cutScene1_5(context);
                        setTimeout(() => {                            
                            cutScene = '';
                        }, cutSceneTime);
                    } else if (cutScene === '2_1') {
                        cutScener.cutScene2_1(context);
                        setTimeout(() => {                            
                            cutScene = '2_2';
                        }, cutSceneTime);
                    } else if (cutScene === '2_2') {
                        cutScener.cutScene2_2(context);
                        setTimeout(() => {                            
                            cutScene = '2_3';
                        }, cutSceneTime);
                    } else if (cutScene === '2_3') {
                        cutScener.cutScene2_3(context);
                        setTimeout(() => {                            
                            cutScene = '2_4';
                        }, cutSceneTime);
                    } else if (cutScene === '2_4') {
                        cutScener.cutScene2_4(context);
                        setTimeout(() => {                            
                            cutScene = '2_5';
                        }, cutSceneTime);
                    } else if (cutScene === '2_5') {
                        cutScener.cutScene2_5(context);
                        setTimeout(() => {                            
                            cutScene = '2_6';
                        }, cutSceneTime);
                    } else if (cutScene === '2_6') {
                        cutScener.cutScene2_6(context);
                        setTimeout(() => {                            
                            cutScene = '';
                        }, cutSceneTime);
                    } else if (cutScene === '3_1') {
                        cutScener.cutScene3_1(context);
                        setTimeout(() => {                            
                            cutScene = '3_2';
                        }, cutSceneTime);
                    } else if (cutScene === '3_2') {
                        cutScener.cutScene3_2(context);
                        setTimeout(() => {                            
                            cutScene = '3_3';
                        }, cutSceneTime);
                    } else if (cutScene === '3_3') {
                        cutScener.cutScene3_3(context);
                        setTimeout(() => {                            
                            cutScene = '3_4';
                        }, cutSceneTime);
                    } else if (cutScene === '3_4') {
                        cutScener.cutScene3_4(context);
                        setTimeout(() => {                            
                            cutScene = '3_5';
                        }, cutSceneTime);
                    } else if (cutScene === '3_5') {
                        cutScener.cutScene3_5(context);
                        setTimeout(() => {                            
                            cutScene = '';
                        }, cutSceneTime);
                    } else if (cutScene === '4_1') {
                        cutScener.cutScene4_1(context);
                        setTimeout(() => {                            
                            cutScene = '4_2';
                        }, cutSceneTime);
                    } else if (cutScene === '4_2') {
                        cutScener.cutScene4_2(context);
                        setTimeout(() => {                            
                            cutScene = '4_3';
                        }, cutSceneTime);
                    } else if (cutScene === '4_3') {
                        cutScener.cutScene4_3(context);
                        setTimeout(() => {                            
                            cutScene = '4_4';
                        }, cutSceneTime);
                    } else if (cutScene === '4_4') {
                        cutScener.cutScene4_4(context);
                        setTimeout(() => {                            
                            cutScene = '4_5';
                        }, cutSceneTime);
                    } else if (cutScene === '4_5') {
                        cutScener.cutScene4_5(context);
                        setTimeout(() => {                            
                            cutScene = '4_6';
                        }, cutSceneTime);
                    } else if (cutScene === '4_6') {
                        cutScener.cutScene4_6(context);
                        setTimeout(() => {                            
                            cutScene = '';
                        }, cutSceneTime);
                    } else if (cutScene === '5_1') {
                        cutScener.cutScene5_1(context);
                        setTimeout(() => {                            
                            cutScene = '5_2';
                        }, cutSceneTime);
                    } else if (cutScene === '5_2') {
                        cutScener.cutScene5_2(context);
                        setTimeout(() => {                            
                            cutScene = '5_3';
                        }, cutSceneTime);
                    } else if (cutScene === '5_3') {
                        cutScener.cutScene5_3(context);
                        setTimeout(() => {                            
                            cutScene = '5_4';
                        }, cutSceneTime);
                    } else if (cutScene === '5_4') {
                        cutScener.cutScene5_4(context);
                        setTimeout(() => {                            
                            cutScene = '5_5';
                        }, cutSceneTime);
                    } else if (cutScene === '5_5') {
                        cutScener.cutScene5_5(context);
                        setTimeout(() => {                            
                            cutScene = '5_6';
                        }, cutSceneTime);
                    } else if (cutScene === '5_6') {
                        cutScener.cutScene5_6(context);
                        setTimeout(() => {                            
                            cutScene = '5_7';
                        }, cutSceneTime);
                    } else if (cutScene === '5_7') {
                        cutScener.cutScene5_7(context);
                        setTimeout(() => {                            
                            cutScene = '5_8';
                        }, cutSceneTime);
                    } else if (cutScene === '5_8') {
                        cutScener.cutScene5_8(context);
                        setTimeout(() => {                            
                            cutScene = '5_9';
                        }, cutSceneTime);
                    } else if (cutScene === '5_9') {
                        cutScener.cutScene5_9(context);
                        setTimeout(() => {                            
                            cutScene = '';
                        }, cutSceneTime);
                    } else if (cutScene === '6_1') {
                        cutScener.cutScene6_1(context);
                        setTimeout(() => {                            
                            cutScene = '6_2';
                        }, cutSceneTime);
                    } else if (cutScene === '6_2') {
                        cutScener.cutScene6_2(context);
                        setTimeout(() => {                            
                            cutScene = '6_3';
                        }, cutSceneTime);
                    } else if (cutScene === '6_3') {
                        cutScener.cutScene6_3(context);
                        setTimeout(() => {                            
                            cutScene = '6_4';
                        }, cutSceneTime);
                    } else if (cutScene === '6_4') {
                        cutScener.cutScene6_4(context);
                        setTimeout(() => {                            
                            cutScene = '6_5';
                        }, cutSceneTime);
                    } else if (cutScene === '6_5') {
                        cutScener.cutScene6_5(context);
                        setTimeout(() => {                            
                            cutScene = '6_6';
                        }, cutSceneTime);
                    } else if (cutScene === '6_6') {
                        cutScener.cutScene6_6(context);
                        setTimeout(() => {                            
                            cutScene = '6_7';
                        }, cutSceneTime);
                    } else if (cutScene === '6_7') {
                        cutScener.cutScene6_7(context);
                        setTimeout(() => {                            
                            cutScene = '6_8';
                        }, cutSceneTime);
                    } else if (cutScene === '6_8') {
                        cutScener.cutScene6_8(context);
                        setTimeout(() => {                            
                            cutScene = '6_9';
                        }, cutSceneTime);
                    } else if (cutScene === '6_9') {
                        cutScener.cutScene6_9(context);
                        setTimeout(() => {                            
                            cutScene = '6_10';
                        }, cutSceneTime);
                    } else if (cutScene === '6_10') {
                        cutScener.cutScene6_10(context);
                        setTimeout(() => {                            
                            cutScene = '';
                        }, cutSceneTime);
                    }
                }
            } else {
                if (context) {
                    context.fillStyle = 'white';
                    context.fillRect(0, 0, 800, 600);
                    context.fillStyle = 'black';
                    context.font = 'Bold 50px Arial';
                    context.fillText('Click  to continue', 200, 200);
                    context.fillText('Press Enter to restart', 150, 300);
                    context.drawImage(cursor.image, cursor.x, cursor.y);
                };
            }
        } else {
            if (context) {
                context.fillStyle = 'white';
                context.fillRect(0, 0, 800, 600);
                context.fillStyle = 'black';
                context.font = 'Bold 40px Arial';
                context.fillText('You are a tasty cheesy toast...', 115, 100);
                context.fillText('...in a field full of monsters!', 145, 150);
                context.font = 'Bold 30px Arial';
                context.fillText("Don't let them get to your cheese!", 160, 230);
                context.fillText('Move - "AWSD"   Shoot - "Mouse"', 160, 310);
                context.fillText('Reload - "Space"', 285, 360);
                context.font = 'Bold 50px Arial';
                context.fillText('Press Enter to start', 170, 470);
                context.drawImage(cursor.image, cursor.x, cursor.y);
            };
        };
    };

    const keys = {
        'W': 87,
        'S': 83,
        'A': 65,
        'D': 68,
        ' ': 32
    };

    let keyDown = {
        87: false,
        83: false,
        65: false,
        68: false,
        32: false
    };

    let playing = false;

    const isKeyDown = (keyName: 'W' | 'S' | 'A' | 'D' | ' ') => {
        return keyDown[keys[keyName] as (87 | 83 | 65 | 68 | 32)] === true;
    };

    const clearKey = (keyCode : 87 | 83 | 65 | 68 | 32) => {
        keyDown[keyCode] = false;
    };

    const setKey = (keyCode: 87 | 83 | 65 | 68 | 32) => {
        keyDown[keyCode] = true;
    };

    window.onkeydown = function (e) {
        setKey(e.keyCode as 87 | 83 | 65 | 68 | 32);
        if (e.keyCode === cheatCode[cheatCode.length - 1]) {
            if (cheatCode.length === 1) {
                player.godMode();
                console.log('Добро пожаловать в режим бога! Теперь вы бессмертны и можете ходить сквозб стены и над лавой, также ваша скорость и количество выстрелов увеличена, а монстры умирают от соприкосновения с вами! Удачи в создании монстриного армагеддона!');
            };
            cheatCode.pop();
        };
        if (e.keyCode === 27) {
            pause = true;
        } else if (!pause || e.keyCode !== 13) {
            pause = false;
        }
        if (e.key === 'R' || e.key === ' ') {
            e.preventDefault();
            player.canShoot = false;
        }
        if (pause && e.keyCode === 13) {
            player.x = 1000;
            player.y = 1000;
            player.hp = 100;
            player.maxHp = 100;
            player.damage = 25;
            player.bulletDamage = 25;
            player.score = 0;
            player.vSpeed = 4;
            player.hSpeed = 5;
            player.bulletSkin = 'bullet';
            player.bulletIncX = 42;
            player.bulletIncY = 67;
            player.ammo = 10;
            player.maxAmmo = 10;
            player.canShoot = true;
            stage = 'stage_1';

            cheatCode = [76, 79, 79, 67, 77, 73, 84];
            
            monsterSummoner.monsters = [];
            buffPlacer.buffs = [];
            player.bullets = [];

            playing = true;
            pause = false;
        }
        if (!playing && e.keyCode === 13) {
            player.x = 1000;
            player.y = 1000;
            player.hp = 250;
            player.maxHp = 250;
            player.damage = 60;
            player.bulletDamage = 25;
            player.score = 0;
            player.vSpeed = 5;
            player.hSpeed = 6;
            player.bulletSkin = 'bullet';
            player.bulletIncX = 42;
            player.bulletIncY = 67;
            player.ammo = 30;
            player.maxAmmo = 30;
            player.canShoot = true;
            stage = 'stage_1';

            cheatCode = [76, 79, 79, 67, 77, 73, 84];
            
            monsterSummoner.monsters = [];
            buffPlacer.buffs = [];
            player.bullets = [];

            playing = true;
        }
    };

    window.onkeyup = e => {
        clearKey(e.keyCode as 87 | 83 | 65 | 68 | 32);
    };

    window.onmousemove = e => {
        if (e.target === canvas) {
            cursor.x = e.offsetX - 16;
            cursor.y = e.offsetY - 16;
        };
    };

    window.onclick = e => {
        e.preventDefault();
        if (playing) {
            pause = false;
            if (e.target === canvas) {
                let angle = Math.atan((cursor.y - player.showny - 55 + Math.floor(Math.random() * 60 - 30)) / (cursor.x - player.shownx - 30 + Math.floor(Math.random() * 36 - 18)));
                
                if (angle * weapon.angle < -0.5) {
                    angle += Math.PI;
                };
                if (player.orientation === 'left') {
                    angle += Math.PI;
                };
                
                if (player.canShoot || player.cheating) {
                    const bullet = new Bullet(player.x + player.bulletIncX, player.y + player.bulletIncY, angle, player.bulletSkin, player.damage);
                    player.bullets.push(bullet);
                    player.ammo--;
                    if (player.ammo <= 0) {
                        player.canShoot = false;
                    }
                }
    
                if (player.cheating) {
                    const n = 4;
                    for (let i = 0; i < n - 1; i++) {
                        angle += 2 * Math.PI / n;
                        const bullet = new Bullet(player.x + player.bulletIncX, player.y + player.bulletIncY, angle, player.bulletSkin, player.bulletDamage);
                        player.bullets.push(bullet);
                    }
                };
            };
        }
    };
    


    gameEngineStart(gameLoop);
}


