let clocksTime = document.querySelector(".clock-alarm__time")
let time = clocksTime.value
let timers = localStorage.getItem("timers")?JSON.parse(localStorage.getItem("timers")) : []
for(let item of timers){
    let div = document.createElement("div")
    div.classList.add("clock-alarm__list-item")
    div.innerHTML = `<span>${item}</span><button class="clock-alarm__list-remove-item">&#x2716;</button>`
    document.querySelector(".clock-alarm__list").append(div)
}
document.querySelector(".clock-alarm__time-set").addEventListener("click",function(){
     time = clocksTime.value
     if(time.length<5){
        alert("enter a valid time")
        return
     }
     let div = document.createElement("div")
     div.classList.add("clock-alarm__list-item")
     div.innerHTML = `<span>${time}</span><button class="clock-alarm__list-remove-item">&#x2716;</button>`
    document.querySelector(".clock-alarm__list").append(div)
    timers.push(time)
    localStorage.setItem("timers",JSON.stringify(timers))    
})
document.addEventListener("click",function(e){
    let target = e.target
    if(target.className != "clock-alarm__list-remove-item") return
    let allBtns = Array.from(document.querySelectorAll(".clock-alarm__list-remove-item"))
    let index = allBtns.indexOf(target)
    timers.splice(index,1)
    localStorage.setItem("timers",JSON.stringify(timers))  
    target.parentNode.remove()
})
setInterval(() => {
    let currentTime = new Date()
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes()
    if(minutes < 10) minutes = '0' + minutes
    let str = hours + ":" +minutes
    for(let item of timers){
        if(item == str){
            alert(`ALARM: ${str}`)
            let allBtns = Array.from(document.querySelectorAll(".clock-alarm__list-remove-item"))
            let index = timers.indexOf(item)
            timers.splice(index,1)
            localStorage.setItem("timers",JSON.stringify(timers))
            allBtns[index].parentNode.remove()
        }
    }
}, 1000);