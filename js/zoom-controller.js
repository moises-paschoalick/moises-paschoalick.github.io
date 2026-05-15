class ImageZoomController {
    constructor() {
        this.scale = 1;
        this.originX = 0;
        this.originY = 0;
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
        // Zoom on Wheel
        this.container.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            this.zoom(delta);
        });

        // Drag to Pan
        this.container.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.startX = e.clientX - this.translateX;
            this.startY = e.clientY - this.translateY;
            this.container.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            this.translateX = e.clientX - this.startX;
            this.translateY = e.clientY - this.startY;
            this.applyTransform();
        });

        window.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.container.style.cursor = 'grab';
        });

        // Prevention for image drag behavior
        this.img.addEventListener('dragstart', (e) => e.preventDefault());
    }

    zoom(delta) {
        this.scale *= delta;
        this.scale = Math.min(Math.max(0.5, this.scale), 5); // Limit zoom
        this.applyTransform();
    }

    reset() {
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.applyTransform();
    }

    applyTransform() {
        this.img.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
    }
}

window.initZoomController = (containerId, imgId) => {
    const controller = new ImageZoomController();
    controller.init(containerId, imgId);
    return controller;
};
