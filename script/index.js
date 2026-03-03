const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url) // Return promise of response
        .then(response => response.json()) // Return promise of response of json data
        .then(json_data => displayLesson(json_data.data))
}

const loadLevelWord = id => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayLevelWord(data.data));
}

const displayLevelWord = words => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    words.forEach(word => {
        const wordCard = document.createElement("div");
        wordCard.innerHTML = `
            <div class="bg-white rounded-2xl shadow-sm text-center p-10 space-y-2">
                <h2 class="font-bold text-3xl">${word.word}</h2>
                <p>Meaning / Pronunciation</p>
                <h3 class="text-2xl font-semibold font-bangla">${word.meaning} / ${word.pronunciation}</h3>
                <div class="flex justify-between items-center mt-5">
                    <a href="" class="bg-[#1A91FF20] hover:bg-[#1A91FF80] py-2 px-3 rounded-sm">
                        <i class="fa-solid fa-circle-info"></i>
                    </a>
                    <a href="" class="bg-[#1A91FF20] hover:bg-[#1A91FF80] py-2 px-3 rounded-sm">
                        <i class="fa-solid fa-volume-high"></i>
                    </a>
                </div>
            </div>
        `;
        wordContainer.appendChild(wordCard);
    });
}

const displayLesson = (lessons) => {
    // 1. Get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // 2. Get into every lesson
    lessons.forEach(lesson => {
        // 3. Create element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no});" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `;
        // 4. Append into container
        levelContainer.append(btnDiv);
    });
}
loadLessons();