const moodData = {
    happy: {
        colors: ["#FFD93D", "#FF6B6B", "#FFB5E8", "#A0E7E5", "#FFAEBC"],
        emojis: ["😄", "😊", "😁", "😆", "🥳"]
    },
    calm: {
        colors: ["#A3D8F4", "#CAF7E3", "#F6DFEB", "#E4F9F5", "#C9E4C5"],
        emojis: ["😌", "🙂", "😴", "🤗", "🙃"]
    },
    energetic: {
        colors: ["#FF4E00", "#FFB20F", "#FF8E00", "#FF5F00", "#FF1E00"],
        emojis: ["😃", "🤩", "😎", "😏", "😜"]
    },
    romantic: {
        colors: ["#FF3366", "#FF6699", "#FFB3C6", "#C72C41", "#FFD1DC"],
        emojis: ["😍", "😘", "🥰", "😻", "😉"]
    },
    sad: {
        colors: ["#5D5D81", "#3C3744", "#6B4226", "#2E2E2E", "#1B1B1B"],
        emojis: ["😢", "😭", "😞", "😔", "🥺"]
    }
};

let emojiInterval; // to control continuous rain

function generatePalette() {
    const mood = document.getElementById("moodSelect").value;
    const paletteDiv = document.getElementById("palette");
    paletteDiv.innerHTML = "";

    if (mood && moodData[mood]) {
        moodData[mood].colors.forEach((color, index) => {
            const box = document.createElement("div");
            box.classList.add("color-box");
            box.style.backgroundColor = color;

            // Change background and start emoji rain for that specific color
            box.addEventListener("click", () => {
                document.body.style.backgroundColor = color;
                startContinuousEmojiRain(moodData[mood].emojis[index]);
            });

            paletteDiv.appendChild(box);
        });
    } else {
        paletteDiv.innerHTML = "<p>Please select a mood.</p>";
    }
}

function startContinuousEmojiRain(emojiChar) {
    // Stop previous rain
    if (emojiInterval) clearInterval(emojiInterval);

    emojiInterval = setInterval(() => {
        const emoji = document.createElement("div");
        emoji.textContent = emojiChar;
        emoji.style.position = "fixed";
        emoji.style.left = Math.random() * window.innerWidth + "px";
        emoji.style.top = "-30px";
        emoji.style.fontSize = "24px";
        emoji.style.opacity = Math.random();
        emoji.style.zIndex = 9999;
        document.body.appendChild(emoji);

        let fallDuration = Math.random() * 3000 + 2000; // 2–5 seconds
        let start = null;

        function fall(timestamp) {
            if (!start) start = timestamp;
            let progress = timestamp - start;
            emoji.style.top = (progress / fallDuration) * window.innerHeight + "px";

            if (progress < fallDuration) {
                requestAnimationFrame(fall);
            } else {
                emoji.remove();
            }
        }
        requestAnimationFrame(fall);
    }, 200); // New emoji every 0.2 sec
}
