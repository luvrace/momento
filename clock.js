const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    //clockTitle.innerText = `${ hours <10 ? `0${hours}` : hours }:${ minutes <10? `0${minutes}`: minutes}:${ seconds <10 ? `0${seconds}`: seconds }`;
    clockTitle.innerText  = `${fixTime(hours)}:${fixTime(minutes)}:${fixTime(seconds)}`;
}



function init(){
    setInterval(getTime, 1000);
 
}

function fixTime(time){
    if(time <10){
        return `0${time}`;
    }
    return time;
}

init();