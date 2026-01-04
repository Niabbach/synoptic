let allSignals = {};
let time = [];
let currentSignals = ["voltage.v","diode.v","capacitor.v","load.v"];

fetch("data/ACDC_timeseries.json")
  .then(r => r.json())
  .then(json => {
    allSignals = json.signals;

    // conversion STR → FLOAT
    time = json.time.map(t => Number(t));

    const slider = document.getElementById("time-slider");
    slider.min = 0;
    slider.max = time.length - 1;
    slider.step = 1;

    slider.oninput = e => renderAtIndex(parseInt(e.target.value));
    renderAtIndex(0);
  });

function renderAtIndex(i){
  if(i < 0 || i >= time.length) return;

  document.getElementById("time-value").innerText = `t = ${time[i]} s`;

  currentSignals.forEach(signal => {

    const block = signal.split(".")[0];
    const span  = document.querySelector(`#${block} span`);

    if(!(signal in allSignals)){
      span.innerText = "—";
      span.parentElement.style.opacity = 0.35;
      return;
    }

    const val = allSignals[signal][i];
    span.innerText = val + " V";
    span.parentElement.style.opacity = 1;
  });
}

function jumpToTime(){
  const t = Number(document.getElementById("time-input").value);
  if(isNaN(t)) return;

  const i = time.indexOf(t);
  if(i === -1){
    alert("Ce temps n’existe pas dans la simulation !");
    return;
  }

  document.getElementById("time-slider").value = i;
  renderAtIndex(i);
}

