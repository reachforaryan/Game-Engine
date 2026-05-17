export class Renderer {
    constructor(canvasId, width = 800, height = 800) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");
        
        this.width = width;
        this.height = height;
        
        this.background = "#000000";
        this.foreground = "#50F050";
    }

    clear() {
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    point({x, y}) {
        const s = 20; 
        this.ctx.fillStyle = this.foreground;
        this.ctx.fillRect(x - s/2, y - s/2, s, s);
    }

    line(p1, p2) {
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = this.foreground;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
    }

    screen(p) {
        // -1..1 => 0..2 -> 0..1 => 0..w or h
        return {
            x: (p.x + 1) / 2 * this.width,
            y: (1 - (p.y + 1) / 2) * this.height,
        };
    }
}
