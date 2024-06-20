class Cursor {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        document.addEventListener('mousemove', this.move.bind(this));
        this.changeColor();
    }

    move(event) {
        this.cursor.style.left = `${event.pageX}px`;
        this.cursor.style.top = `${event.pageY}px`;
    }

    changeColor() {
        const colors = ['red', 'blue', 'green', 'yellow'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.cursor.style.backgroundColor = randomColor;
    }
}

export { Cursor };
