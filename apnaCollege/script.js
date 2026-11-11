

function createBox(width, height, x, y, color = "red") {
    let box = document.createElement('div');
    box.style.width = width + 'px';
    box.style.height = height + 'px';
    box.style.backgroundColor = color;
    box.style.position = 'absolute';
    box.style.left = x + 'px';
    box.style.top = y + 'px';
    box.addEventListener('mouseover', handleMouseOver);
    document.body.appendChild(box);
    return box;
}

function createBoxGrid(boxWidth, boxHeight, spacing = 10, rows = 3, cols = 3) {
    let Grid = Array(rows).fill().map(() => Array(cols));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            Grid[i][j] = (createBox(boxWidth, boxHeight, j * (boxWidth + spacing), i * (boxHeight + spacing)));
        }
    }
    loadbuffer();
}

async function loadbuffer(height = 100, width = 100) {
    let buffer = [];
    for (let i = 0; i < 10; i++) {
        let response = await fetch("https://picsum.photos/" + height + "/" + width);
        buffer.push(response);
    }
    console.log(buffer);
    return buffer;
}

async function handleMouseOver(e) {
    // let img = (mainbuffer && mainbuffer.length > 0) ? mainbuffer.pop() : (()=>{mainbuffer=sidebuffer;sidebuffer=loadbuffer()})();
    let img = await fetch("https://picsum.photos/100/100");
    e.target.style.backgroundImage = `url(${img.url})`;
    console.log(img);
}

// let mainbuffer;
// let sidebuffer ;
// ( ()=>{mainbuffer= loadbuffer();
// sidebuffer= loadbuffer();})();

createBoxGrid(100, 100, 0, 9, 16);