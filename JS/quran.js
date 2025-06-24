
// 1. call the API using axios

// const API_URL_ARabic = "http://api.alquran.cloud/v1/quran/quran-uthmani"
// const API_URL_Translation = "http://api.alquran.cloud/v1/quran/en.asad"
// const api_audio = "http://api.alquran.cloud/v1/quran/ar.alafasy"

function fetchArabicQuran(){
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
         
  if(navigator.share) {

  shareButton.addEventListener("click",
  async () => {
    try {
     await navigator.share({
      title: 'Ramdan Hub Share API Example',
      text: 'Check out my website',
      url: window.location.href
     })

  }catch(error){}
 })
 }else {
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

