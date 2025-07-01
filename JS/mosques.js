const myButton = document.querySelector("#btn");
myButton.addEventListener("click", function() {
    window.location.href = "sing-in.html";
});

var icon = document.querySelector("#icon");

icon.onclick = function() {
    document.body.classList.toggle("dark-theme")
    if(document.body.classList.contains("dark-theme")){
        icon.classList = "fa-solid fa-brightness";
    } 
  }
  
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