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


const myButton = document.querySelector("#btn");
myButton.addEventListener("click", function() {
    window.location.href = "sing-in.html";
});

// Side Bar Navigation Starts Here

const menuBtn = document.querySelector("#menuBtn");
const closeBtn = document.querySelector("#closeBtn");
const menuBarBtn = document.querySelector("#menuBarBtn");

menuBtn.addEventListener("click", () => {
    menuBarBtn.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    menuBarBtn.classList.remove("active");
});

// Side Bar Navigation Ends Here