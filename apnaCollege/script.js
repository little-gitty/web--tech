
async function loadBuffer(count = 10, width = 100, height = 100) {
    const requests = Array.from({ length: count }, async () => {
        try {
            const response = await fetch(`https://picsum.photos/${width}/${height}`);
            if (!response.ok) {
                return null;
            }
            return response.url;
        } catch (error) {
            console.warn("Could not load an image:", error);
            return null;
        }
    });

    const images = await Promise.all(requests);
    return images.filter((url) => url);
}

function createBox(width, height, x, y, color = "red") {
    const box = document.createElement("div");
    box.style.width = width + "px";
    box.style.height = height + "px";
    box.style.backgroundColor = color;
    box.style.position = "absolute";
    box.style.left = x + "px";
    box.style.top = y + "px";
    box.addEventListener("mouseover", handleMouseOver);
    document.body.appendChild(box);
    return box;
}

async function refreshImageBuffer() {
    if (!sideBuffer || isRefreshing) {
        return;
    }

    isRefreshing = true;
    try {
        const nextBuffer = await sideBuffer;
        if (nextBuffer.length > 0) {
            mainBuffer = nextBuffer;
        }
        sideBuffer = loadBuffer(20);
    } finally {
        isRefreshing = false;
    }
}

function handleMouseOver(event) {
    if (mainBuffer.length === 0) {
        return;
    }

    const imageUrl = mainBuffer[index % mainBuffer.length];
    index = (index + 1) % mainBuffer.length;
    event.target.style.backgroundImage = `url("${imageUrl}")`;

    if (index === 0) {
        void refreshImageBuffer();
    }
}

function createBoxGrid(boxWidth, boxHeight, spacing = 10, rows = 3, cols = 3) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            createBox(
                boxWidth,
                boxHeight,
                j * (boxWidth + spacing),
                i * (boxHeight + spacing)
            );
        }
    }
}

async function init() {
    const loading = document.getElementById("loading");
    try {
        mainBuffer = await loadBuffer(10);
        if (mainBuffer.length === 0) {
            throw new Error("No images could be loaded.");
        }

        sideBuffer = loadBuffer(20);
        loading.style.display = "none";
        createBoxGrid(100, 100, 0, 9, 16);
    } catch (error) {
        console.error("Error initializing the application:", error);
        loading.textContent = "Unable to load images.";
        loading.setAttribute("role", "alert");
    }
}

let mainBuffer = [];
let sideBuffer = null;
let index = 0;
let isRefreshing = false;

void init();