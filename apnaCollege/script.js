function createBox(width, height, color="white") {
    let box = document.createElement('div');
    box.style.width = width + 'px';
    box.style.height = height + 'px';
    box.style.backgroundColor = color;
    return box;
}

function placeBox(box, x, y, offsetX = 0, offsetY = 0) {
    box.style.position = 'absolute';
    box.style.left = x + offsetX + 'px';
    box.style.top = y + offsetY + 'px';
    document.body.appendChild(box);
}

function createBoxGrid(rows=3, cols=3, boxWidth, boxHeight, spacing = 10) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let box = createBox(boxWidth, boxHeight);
            placeBox(box, j * (boxWidth + spacing), i * (boxHeight + spacing));
        }
    }
}

function handleMouseMove() {
    document.body.addEventListener('hover', (e) => {
        
    });
}


// let box=document.createElement('div');

// box.style.width='1000px';
// box.style.height='1000px';
// box.style.backgroundColor='red';
// box.style.position='absolute';

// let box1=document.createElement('div');
// box1.style.width='200px';
// box1.style.height='200px';
// // box1.style.backgroundColor='blue';
// box1.style.position='absolute';

// let box2=document.createElement('div');
// box2.style.width='100px';
// box2.style.height='100px';
// // box2.style.backgroundColor='green';
// box2.style.position='absolute';

// let box3=document.createElement('div');
// box3.style.width='50px';
// box3.style.height='50px';
// box3.style.backgroundColor='yellow';
// box3.style.position='absolute';

// document.body.appendChild(box);
// document.body.appendChild(box1);
// document.body.appendChild(box2);
// document.body.appendChild(box3);

// document.body.addEventListener('mouseover',function(e){
//     box.style.left=e.clientX-500+'px';
//     box.style.top=e.clientY-500+'px';
//     box1.style.left=e.clientX-100+'px';
//     box1.style.top=e.clientY-100+'px';
//     box2.style.left=e.clientX-50+'px';
//     box2.style.top=e.clientY-50+'px';
//     box3.style.left=e.clientX-25+'px';
//     box3.style.top=e.clientY-25+'px';
//     // box.style.backgroundColor='red';
    
//     console.log(e.clientX, e.clientY);
// });