export class CutScene {
    private toast: HTMLImageElement;
    private king: HTMLImageElement;
    private brain: HTMLImageElement;
    private banana: HTMLImageElement;

    constructor () {
        this.toast = new Image();
        this.toast.src = `./images/cut_scenes/toast.png`;
        this.king = new Image();
        this.king.src = `./images/cut_scenes/king.png`;
        this.brain = new Image();
        this.brain.src = `./images/cut_scenes/brain.png`;
        this.banana = new Image();
        this.banana.src = `./images/cut_scenes/banana.png`;
    }

    cutScene1_1(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('???', 400, 500);
        ctx.drawImage(this.toast, 600, 400);
    }

    cutScene1_2(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('You bastard!', 250, 500);
        ctx.drawImage(this.king, -88, 400);
    }

    cutScene1_3(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('What do you want?', 150, 500);
        ctx.drawImage(this.toast, 600, 400);
    }

    cutScene1_4(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('You killed 100', 250, 400);
        ctx.fillText('of my people!', 250, 500);
        ctx.drawImage(this.king, -88, 400);
    }

    cutScene1_5(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('I`ll kill you', 250, 400);
        ctx.fillText('for them and my lord!', 250, 500);
        ctx.drawImage(this.king, -88, 400);
    }

    cutScene2_1(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('You escaped me,', 250, 400);
        ctx.fillText('Toast!', 250, 500);
        ctx.drawImage(this.king, -88, 400);
    }

    cutScene2_2(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('My lord`ll get you!', 250, 500);
        ctx.drawImage(this.king, -88, 400);
    }

    cutScene2_3(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('Who are you', 150, 400);
        ctx.fillText('talking about?', 150, 500);
        ctx.drawImage(this.toast, 600, 400);
    }

    cutScene2_4(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('Aaagh... *dies*', 250, 500);
        ctx.drawImage(this.king, -88, 400);
    }

    cutScene2_5(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('Damn! Hit him', 150, 400);
        ctx.fillText('too hard.', 150, 500);
        ctx.drawImage(this.toast, 600, 400);
    }

    cutScene2_6(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('Oh no! Next wave!', 150, 500);
        ctx.drawImage(this.toast, 600, 400);
    }

    cutScene3_1(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('???', 400, 500);
        ctx.drawImage(this.toast, 600, 400);
    }

    cutScene3_2(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('*angry bip-bop', 250, 400);
        ctx.fillText('noises*', 250, 500);
        ctx.drawImage(this.brain, -88, 400);
    }

    cutScene3_3(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('So... Are you', 150, 400);
        ctx.fillText('"the lord"?', 150, 500);
        ctx.drawImage(this.toast, 600, 400);
    }

    cutScene3_4(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('No *bip-bop*', 250, 400);
        ctx.fillText('but he told me...', 250, 500);
        ctx.drawImage(this.brain, -88, 400);
    }

    cutScene3_5(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('To kill you!', 250, 400);
        ctx.fillText('P.S. *bip-bop*', 250, 500);
        ctx.drawImage(this.brain, -88, 400);
    }

    cutScene4_1(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('My lord will', 250, 400);
        ctx.fillText('get you anyway!', 250, 500);
        ctx.drawImage(this.brain, -88, 400);
    }

    cutScene4_2(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('Who is he???', 150, 500);
        ctx.drawImage(this.toast, 600, 400);
    }

    cutScene4_3(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('You`ll find out', 250, 400);
        ctx.fillText('really soon...', 250, 500);
        ctx.drawImage(this.brain, -88, 400);
    }

    cutScene4_4(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('After next wave?', 150, 500);
        ctx.drawImage(this.toast, 600, 400);
    }

    cutScene4_5(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('living stopped', 250, 400);
        ctx.fillText('*bip... bop...*', 250, 500);
        ctx.drawImage(this.brain, -88, 400);
    }

    cutScene4_6(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('Oh... I guess', 150, 400);
        ctx.fillText('here it goes again', 150, 500);
        ctx.drawImage(this.toast, 600, 400);
    }

    cutScene5_1(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('???', 400, 500);
        ctx.drawImage(this.toast, 600, 400);
    }

    cutScene5_2(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('We finally meet,', 250, 400);
        ctx.fillText('Toast!', 250, 500);
        ctx.drawImage(this.banana, -88, 400);
    }

    cutScene5_3(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('Banana???', 150, 400);
        ctx.fillText('Are you "the lord?"', 150, 500);
        ctx.drawImage(this.toast, 600, 400);
    }

    cutScene5_4(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('But...', 150, 400);
        ctx.fillText('Why???', 150, 500);
        ctx.drawImage(this.toast, 600, 400);
    }

    cutScene5_5(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('Everyone loves toast', 250, 400);
        ctx.fillText('with "tasty" cheese', 250, 500);
        ctx.drawImage(this.banana, -88, 400);
    }

    cutScene5_6(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('But nobody wants', 250, 400);
        ctx.fillText('Banana!', 250, 500);
        ctx.drawImage(this.banana, -88, 400);
    }

    cutScene5_7(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('We can settle', 150, 400);
        ctx.fillText('this peacefully', 150, 500);
        ctx.drawImage(this.toast, 600, 400);
    }

    cutScene5_8(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('No! There is', 250, 400);
        ctx.fillText('only one way...', 250, 500);
        ctx.drawImage(this.banana, -88, 400);
    }

    cutScene5_9(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('Die!', 250, 500);
        ctx.drawImage(this.banana, -88, 400);
    }

    cutScene6_1(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('This is not', 250, 400);
        ctx.fillText('the end, Toast!', 250, 500);
        ctx.drawImage(this.banana, -88, 400);
    }

    cutScene6_2(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('There`ll be a day', 250, 400);
        ctx.fillText('when everyone will', 250, 500);
        ctx.drawImage(this.banana, -88, 400);
    }

    cutScene6_3(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('eat bananas for', 250, 400);
        ctx.fillText('breakfast...', 250, 500);
        ctx.drawImage(this.banana, -88, 400);
    }

    cutScene6_4(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 40px Arial';
        ctx.fillText('Actually, I like', 150, 400);
        ctx.fillText('bananas for breakfast', 150, 500);
        ctx.drawImage(this.toast, 600, 400);
    }

    cutScene6_5(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('Wait...', 250, 400);
        ctx.fillText('Really?', 250, 500);
        ctx.drawImage(this.banana, -88, 400);
    }

    cutScene6_6(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('Yup!', 150, 500);
        ctx.drawImage(this.toast, 600, 400);
    }

    cutScene6_7(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 40px Arial';
        ctx.fillText('Well, that brings', 250, 400);
        ctx.fillText('peace to my rotten heart', 250, 500);
        ctx.drawImage(this.banana, -88, 400);
    }

    cutScene6_8(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 40px Arial';
        ctx.fillText('Live a happy live, Toast', 250, 400);
        ctx.fillText('Someday we`ll meet again', 250, 500);
        ctx.drawImage(this.banana, -88, 400);
    }

    cutScene6_9(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 50px Arial';
        ctx.fillText('RIP, friend...', 150, 500);
        ctx.drawImage(this.toast, 600, 400);
    }

    cutScene6_10(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'black';
        ctx.font = 'Bold 40px Arial';
        ctx.fillText('Finally, I can go home', 150, 400);
        ctx.fillText('If i`ll find the way...', 150, 500);
        ctx.drawImage(this.toast, 600, 400);
    }
}