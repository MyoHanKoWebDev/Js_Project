const tDis = document.getElementById("dis");
const stbtn = document.getElementById("stbtn");
const pbtn = document.getElementById("pbtn");
const rbtn = document.getElementById("rbtn");


let stTime = 0;
let elapsedTime = 0;
let pause = false;
let sec = 0;
let min = 0;
let hr = 0;
let setTimeId;

stbtn.addEventListener('click', () => {
    if (!pause) {
        pause = true;
        stTime = Date.now() - elapsedTime; //0
        setTimeId = setInterval(upTime, 75);
    }
})

pbtn.addEventListener('click', () => {
    if (pause) {
        pause = false;
        elapsedTime = Date.now() - stTime; //now - 0 per 75 millisec;
        clearInterval(setTimeId);
    }
})

rbtn.addEventListener('click', () => {
    pause = false;
    clearInterval(setInterval);
    stTime = 0;
    elapsedTime = 0;
    sec = 0;
    min = 0;
    hr = 0;
    tDis.textContent = "00:00:00";
})

function upTime() {
    elapsedTime = Date.now() - stTime; //now - 0 per 75 millisec;

    sec = Math.floor(elapsedTime / 1000) % 60; // 60000 milli sec mr 00 pya chin lo 60 nae % lote
    min = Math.floor(elapsedTime / (1000 * 60)) % 60; //3600000 milli sec mr 00 pya chin lo 60 nae %htet lote
    hr = Math.floor(elapsedTime / (1000 * 60 * 60)) % 60; //3600000*24 milli sec mr 00 pya chin lo 60 nae %htet lote

    sec = zeroForm(sec);
    min = zeroForm(min);
    hr = zeroForm(hr);

    tDis.textContent = `${hr}:${min}:${sec}`;

    function zeroForm(unit) {
        unit = unit.toString();
        return unit.length < 2 ? "0" + unit : unit;
    }
}