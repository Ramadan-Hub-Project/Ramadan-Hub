const PrayerTimes_API = "https://api.aladhan.com/v1/timingsByCity?city=Mogadisho&country=Somalia&method=2"

function fetchPrayerTimesAPI() {
    return axios.get(PrayerTimes_API)
        .then((Response) => {
            return Response.data.data.timings
        })
        .catch((error) => {
            console.log(error)
        })
        
}

function cardPrayerTimes(prayer) {
    const fajrSalah = document.querySelector(".fajr")
    fajrSalah.textContent = prayer.Fajr

    const duhurSalah = document.querySelector(".duhur")
    duhurSalah.textContent = prayer.Dhuhr
    
    const asrSalah = document.querySelector(".asr")
    asrSalah.textContent = prayer.Asr

    const maghribSalah = document.querySelector(".maghrib")
    maghribSalah.textContent = prayer.Maghrib

    const ishaSalah = document.querySelector(".isha")
    ishaSalah.textContent = prayer.Isha
}

function displayCardPraerTimes() {
    fetchPrayerTimesAPI()
        .then((prayer) => {
            cardPrayerTimes(prayer)
        })
}

displayCardPraerTimes()

function getNextPrayerAndCountdown(prayers) {
    const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]
    const now = new Date()

    let nextPrayerName = ""
    let nextPrayerTime = null
    let previousPrayerTime = null

    for (let i = 0; i < prayerOrder.length; i++) {
        const prayerName = prayerOrder[i]
        const timeString = prayers[prayerName]  // e.g., "13:30"
        const [hour, minute] = timeString.split(":")
        const prayerDate = new Date(now)
        prayerDate.setHours(parseInt(hour))
        prayerDate.setMinutes(parseInt(minute))
        prayerDate.setSeconds(0)

        if (prayerDate > now) {
            nextPrayerName = prayerName
            nextPrayerTime = prayerDate
            if (i > 0) {
                const prevTime = prayers[prayerOrder[i - 1]].split(":")
                previousPrayerTime = new Date(now)
                previousPrayerTime.setHours(parseInt(prevTime[0]))
                previousPrayerTime.setMinutes(parseInt(prevTime[1]))
                previousPrayerTime.setSeconds(0)
            } else {
                previousPrayerTime = new Date(now)
                previousPrayerTime.setHours(0, 0, 0)
            }
            break
        }
    }

    return { nextPrayerName, nextPrayerTime, previousPrayerTime }
}

function startCountdown(nextPrayerTime, previousPrayerTime, nextPrayerName) {
    const timerElement = document.querySelector(".timer")
    const headingElement = document.querySelector(".wakhtiga-xiga h4")
    const progressBar = document.querySelector(".progress")

    headingElement.textContent = `Next Prayer: ${nextPrayerName}`

    const totalDuration = (nextPrayerTime - previousPrayerTime) / 1000  // in seconds

    const interval = setInterval(() => {
        const now = new Date()
        const timeLeft = (nextPrayerTime - now) / 1000  // seconds

        if (timeLeft <= 0) {
            clearInterval(interval)
            timerElement.textContent = "00:00:00"
            progressBar.style.width = "100%"
            return
        }

        const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0')
        const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0')
        const seconds = String(Math.floor(timeLeft % 60)).padStart(2, '0')

        timerElement.textContent = `${hours}:${minutes}:${seconds}`

        // Progress calculation
        const passedTime = totalDuration - timeLeft
        const progressPercent = (passedTime / totalDuration) * 100
        progressBar.style.width = `${progressPercent}%`

    }, 1000)
}


function displayCardProgresPrayerTimes() {
    fetchPrayerTimesAPI()
        .then((prayers) => {
            cardPrayerTimes(prayers)

            const { nextPrayerName, nextPrayerTime, previousPrayerTime } = getNextPrayerAndCountdown(prayers)

            startCountdown(nextPrayerTime, previousPrayerTime, nextPrayerName)
        })
}
displayCardProgresPrayerTimes()


// 1. call the API using axios

// const API_URL_ARabic = "http://api.alquran.cloud/v1/quran/quran-uthmani"
// const API_URL_Translation = "http://api.alquran.cloud/v1/quran/en.asad"
// const api_audio = "http://api.alquran.cloud/v1/quran/ar.alafasy"

function fetchArabicQuran() {
    return axios.get("http://api.alquran.cloud/v1/quran/quran-uthmani")
        .then((response) => {
            const quran = response.data;
            return createQuranCard(quran);
        })
        .catch((error) => console.log(error));
}

function createQuranCard(quran) {
    const surahName = document.querySelector(".surah-name");
    const ayahQuran = document.querySelector(".ayah-quran");

    const surahs = quran.data.surahs;

    const randomSurahIndex = Math.floor(Math.random() * surahs.length);
    const surah = surahs[randomSurahIndex];
    const randomAyahIndex = Math.floor(Math.random() * surah.ayahs.length);
    const ayah = surah.ayahs[randomAyahIndex];

    surahName.textContent = `From Surah: ${surah.englishName}`;
    ayahQuran.textContent = ayah.text;

    return { surahNum: surah.number, ayahNum: ayah.numberInSurah };
}

const ayahTranslation = document.querySelector(".ayah-translation");

function fetchTranslation(surahNum, ayahNum) {
    return axios.get(`https://api.alquran.cloud/v1/ayah/${surahNum}:${ayahNum}/en.asad`)
        .then((res) => {
            const translationText = res.data.data.text;
            ayahTranslation.textContent = translationText;
        })

        .catch((error) => console.log(error));

}

const ayahAudio = document.querySelector(".ayah-audio")

function fetchAudio(surahNum, ayahNum) {
    return axios(`http://api.alquran.cloud/v1/ayah/${surahNum}:${ayahNum}/ar.alafasy`)
        .then((response) => {
            const audioAyah = response.data.data.audio;
            ayahAudio.src = audioAyah;
            ayahAudio.load();
            ayahAudio.play();
        })

        .catch((error) => console.log(error))
}

function displayRandomAyah() {
    fetchArabicQuran()
        .then(({ surahNum, ayahNum }) => {
            fetchTranslation(surahNum, ayahNum);
            fetchAudio(surahNum, ayahNum);
        })
        .catch((error) => console.log(error));
}

const buttonAudio = document.querySelector(".play-btn")

buttonAudio.addEventListener("click", displayRandomAyah)

displayRandomAyah()


const shareButton = document.querySelector(".share-btn")

if (navigator.share) {

    shareButton.addEventListener("click",
        async () => {
            try {
                await navigator.share({
                    title: 'Ramdan Hub Share API Example',
                    text: 'Check out my website',
                    url: window.location.href
                })

            } catch (error) { }
        })
} else {
    alert("Web Share API is not supported in your browser")
}

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

const myButton = document.querySelector("#btn");
myButton.addEventListener("click", function() {
    window.location.href = "sing-in.html";
});