// Re-usable function start
const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn btn-outline btn-primary">${el}</span>`);
    return htmlElements.join(" ");
}

const manageSpinner = status => {
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    } else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const pronounceWord = word => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-En";
    window.speechSynthesis.speak(utterance);
}
// Re-usable function end

// Load Lesson
const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url) // Return promise of response
        .then(response => response.json()) // Return promise of response of json data
        .then(json_data => displayLesson(json_data.data))
}

// Remove and Active Functionality
const removeActive =()=> {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => btn.classList.remove("active"));
}
// Load Words
const loadLevelWord = id => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            removeActive(); //Remove all active class
            const clickBtn = document.getElementById(`level-btn-${id}`);
            clickBtn.classList.add("active"); //Add active class
            // console.log(clickBtn);
            displayLevelWord(data.data)
        });
}

// Load Words Details
const loadWordDetail = async id =>{
    const url = await `https://openapi.programming-hero.com/api/word/${id}`;
    const response = await fetch(url);
    const details = await response.json();
    displaywordDetail(details.data);
}

// Display Word Details
const displaywordDetail = word => {
    const detailModal = document.getElementById("details-container");
    detailModal.innerHTML = `
        <div>
            <h2 class="text-2xl font-bold font-bangla">
                ${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})
            </h2>
        </div>
        <div>
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
        </div>
        <div>
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
        </div>
        <div>
            <h2 class="font-bold mb-1">Synonyms</h2>
            <div>${createElements(word.synonyms)}</div>
        </div>
    `;
    document.getElementById("word_modal").showModal();
}

// Display Words
const displayLevelWord = words => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    // Is Words empty
    if(words.length == 0){
        wordContainer.innerHTML = `
            <div class="text-center col-span-full font-bangla space-y-4 py-5">
                <img class="mx-auto" src="./assets/alert-error.png" alt="" >
                <p class="text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="text-3xl font-bold">নেক্সট Lesson এ যান।</h2>
            </div>
        `;
        manageSpinner(false);
        return;
    }


    words.forEach(word => {
        const wordCard = document.createElement("div");
        wordCard.innerHTML = `
            <div class="bg-white rounded-2xl shadow-sm text-center p-10 space-y-2">
                <h2 class="font-bold text-3xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                <p>Meaning / Pronunciation</p>
                <h3 class="text-2xl font-semibold font-bangla">
                    ${word.meaning ? word.meaning :"শব্দার্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}</h3>
                <div class="flex justify-between items-center mt-5">
                    <button onclick="loadWordDetail(${word.id})" href="" class="bg-[#1A91FF20] hover:bg-[#1A91FF80] py-2 px-3 rounded-sm">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button onclick="pronounceWord('${word.word}');" class="bg-[#1A91FF20] hover:bg-[#1A91FF80] py-2 px-3 rounded-sm">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
            </div>
        `;
        wordContainer.appendChild(wordCard);
    });
    manageSpinner(false);
}

// Display Lesson
const displayLesson = (lessons) => {
    // 1. Get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // 2. Get into every lesson
    lessons.forEach(lesson => {
        // 3. Create element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="level-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no});" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `;
        // 4. Append into container
        levelContainer.append(btnDiv);
    });
}
// Main Function
loadLessons();

// Search Functionality
document.getElementById("btn-search").addEventListener("click", () => {
    removeActive();
    const input = document.getElementById("input-search");
    const inputValue = input.value.trim().toLowerCase();

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(response => response.json())
    .then(data => {
        const allwords = data.data;
        const filterWords = allwords.filter((word) =>
            word.word.toLowerCase().includes(inputValue));
        displayLevelWord(filterWords);
    });
});