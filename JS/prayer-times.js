const prayer_API = "https://api.aladhan.com/v1/timingsByCity?city=Mogadisho&country=Somalia&method=2"

function fetchprayerAPI() {
    return axios.get(prayer_API)
        .then((Response) => {
            return(Response.data.data.timings)
        })
        .catch((error) => {
            return(error)
        })
}



function cardprayer(prayer) {
    const fajr =document.querySelector(".fajr")
    fajr.textContent = `${prayer.Fajr} AM` 

    const Dhuhr =document.querySelector(".duhur")
    Dhuhr.textContent = `${prayer.Dhuhr} AM` 


    const Asr =document.querySelector(".asr")
    Asr.textContent = `${prayer.Asr} AM` 


    const Maghrib =document.querySelector(".maqrib")
    Maghrib.textContent = `${prayer.Maghrib} AM` 


    const Isha =document.querySelector(".Isha")
    Isha.textContent = `${prayer.Isha} AM` 

}

function displaycardprayer() {
    fetchprayerAPI()
    .then((prayer) => {
     cardprayer(prayer)
    })
}

displaycardprayer()