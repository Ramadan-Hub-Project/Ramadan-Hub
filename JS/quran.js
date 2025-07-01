// Hadith Starts Here

const Hadith_API = "https://api.hadith.gading.dev/books/muslim?range=1-150"

function fetchHAdithAPI() {
    return axios.get(Hadith_API)
        .then((Response) => {
            return Response.data.data.hadiths
        })
        .catch((error) => {
            console.log(error)
        })
}

function cardHadithAPI(hadith) {
    const hadithTitle = document.querySelector(".hadith-title")
    hadithTitle.textContent = `sahih al-bukhari believe Hadith ${hadith.number}`

    const hadithText = document.querySelector(".hadith-text")
    hadithText.textContent = hadith.arab
}

function displayCardHadith() {
    fetchHAdithAPI()
        .then((hadiths) => {
            const hadithRandom = Math.floor(Math.random() * hadiths.length)
            const hadithIndex = hadiths[hadithRandom]
            cardHadithAPI(hadithIndex)
        })
}

displayCardHadith()

// Hadiths Ends Here