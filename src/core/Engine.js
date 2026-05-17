export class Engine {
    constructor(updateFn, renderFn) {
        this.updateFn = updateFn;
        this.renderFn = renderFn;
        this.isRunning = false;
        this.lastTime = 0;
        this.loop = this.loop.bind(this);
    }

    start() {
        this.isRunning = true;
        this.lastTime = performance.now();
        requestAnimationFrame(this.loop);
    }

    stop() {
        this.isRunning = false;
    }

    loop(currentTime) {
        if (!this.isRunning) return;

        const deltaTime = (currentTime - this.lastTime) / 1000; // convert to seconds
        
        // Cap deltaTime to avoid massive jumps if tab is inactive
        const dt = Math.min(deltaTime, 0.1); 

        this.updateFn(dt);
        this.renderFn();

        this.lastTime = currentTime;
        requestAnimationFrame(this.loop);
    }
}
