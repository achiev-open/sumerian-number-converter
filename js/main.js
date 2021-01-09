const form = document.getElementById('sumerian-converter');

function b10Tob60(b10Number) {
  let numberParts = [];
  let rest = b10Number;
  while (rest) {
    numberParts.push(rest % 60 < 10 ? `0${rest % 60}` : `${rest % 60}`);
    rest = Math.floor(rest / 60);
  }
  return numberParts.reverse();
}

function getFormula(b60Number) {
  return [...b60Number].reverse().map((part, index) => {
    return `${+part} * 60^${index}`;
  }).reverse().join(` + `);
}

function setDisplay(b60Number, container) {
  container.innerHTML = '';
  b60Number.map((group, i) => {
    const values = group.split('').map(v => +v);
    const domNumberTen = document.createElement('div');
    domNumberTen.classList.add('s-number');
    if (!values[0] && i) domNumberTen.style.minWidth = '60px';
    for (let i = 0; i < values[0]; i++) {
      const domSymbol = document.createElement('div');
      domSymbol.classList.add('s-10');
      domNumberTen.appendChild(domSymbol);
    }
    container.appendChild(domNumberTen);

    const domNumberUnit = document.createElement('div');
    domNumberUnit.classList.add('s-number');
    container.appendChild(domNumberUnit);
    for (let i = 0; i < values[1]; i++) {
      const domSymbol = document.createElement('div');
      domSymbol.classList.add('s-1');
      domNumberUnit.appendChild(domSymbol);
    }
  });
  // <div class="s-number">
  //   <div class="s-10"></div>
  // </div>
  console.log(b60Number);
}

// submitBtn.onclick = (e) => {
form.onsubmit = (e) => {
  e.preventDefault();
  const b10Number = +document.getElementById('base-number').value;
  if (!b10Number || b10Number <= 0) {
    alert('Enter a value above 1');
    return;
  }

  const b60Number = b10Tob60(b10Number);
  const formula = getFormula(b60Number);
  document.getElementById('formula').value = `${b10Number} = ${formula}`;
  document.getElementById('sexagesimal').value = b60Number.join(` `);
  const container = document.getElementById('sumerian-display');
  setDisplay(b60Number, container);
  return false;
}
