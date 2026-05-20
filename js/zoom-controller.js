class ImageZoomController {
    constructor() {
        this.scale = 1;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.translateX = 0;
        this.translateY = 0;
    }

    init(containerId, imgId) {
        this.container = document.getElementById(containerId);
        this.img = document.getElementById(imgId);

        if (!this.container || !this.img) return;

        this.setupEvents();
    }

    setupEvents() {
        this.img.addEventListener('dragstart', (e) => e.preventDefault());

        // Mouse drag
        this.img.addEventListener('mousedown', (e) => {
            if (this.scale <= 1) return;
            e.preventDefault();
            this.isDragging = true;
            this.startX = e.clientX - this.translateX;
            this.startY = e.clientY - this.translateY;
            this.img.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            this.translateX = e.clientX - this.startX;
            this.translateY = e.clientY - this.startY;
            this.applyTransform();
        });

        document.addEventListener('mouseup', () => {
            if (!this.isDragging) return;
            this.isDragging = false;
            this.img.style.cursor = this.scale > 1 ? 'grab' : 'default';
        });

        // Touch drag
        this.img.addEventListener('touchstart', (e) => {
            if (this.scale <= 1) return;
            e.preventDefault();
            this.isDragging = true;
            const t = e.touches[0];
            this.startX = t.clientX - this.translateX;
            this.startY = t.clientY - this.translateY;
        }, { passive: false });

        document.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
            const t = e.touches[0];
            this.translateX = t.clientX - this.startX;
            this.translateY = t.clientY - this.startY;
            this.applyTransform();
        }, { passive: false });

        document.addEventListener('touchend', () => {
            this.isDragging = false;
        });
    }

    clampTranslate() {
        const maxX = (this.container.offsetWidth  * (this.scale - 1)) / 2;
        const maxY = (this.container.offsetHeight * (this.scale - 1)) / 2;
        this.translateX = Math.min(maxX, Math.max(-maxX, this.translateX));
        this.translateY = Math.min(maxY, Math.max(-maxY, this.translateY));
    }

    zoom(delta) {
        this.scale *= delta;
        this.scale = Math.min(Math.max(0.5, this.scale), 5);
        this.clampTranslate();
        this.img.style.cursor = this.scale > 1 ? 'grab' : 'default';
        this.applyTransform();
    }

    reset() {
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.img.style.cursor = 'default';
        this.applyTransform();
    }

    applyTransform() {
        this.clampTranslate();
        this.img.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
    }
}

window.initZoomController = (containerId, imgId) => {
    const controller = new ImageZoomController();
    controller.init(containerId, imgId);
    return controller;
};
