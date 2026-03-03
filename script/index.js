const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url) // Return promise of response
        .then(response => response.json()) // Return promise of response of json data
        .then(json_data => displayLesson(json_data.data))
}

const removeActive =()=> {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => btn.classList.remove("active"));
}

const loadLevelWord = id => {
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
                    <button onclick="my_modal_5.showModal()" href="" class="bg-[#1A91FF20] hover:bg-[#1A91FF80] py-2 px-3 rounded-sm">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button href="" class="bg-[#1A91FF20] hover:bg-[#1A91FF80] py-2 px-3 rounded-sm">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
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
        <button id="level-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no});" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `;
        // 4. Append into container
        levelContainer.append(btnDiv);
    });
}
loadLessons();