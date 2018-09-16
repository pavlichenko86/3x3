window.addEventListener('click', showClass);

let all = ['up', 'left', 'down', 'right'],
    leftTop = ['down', 'right'],
    rightTop = ['down', 'left'],
    leftBottom = ['up', 'right'],
    rightBottom = ['up', 'left'],
    right = ['up', 'left', 'down'],
    left = ['up', 'right', 'down'],
    topPole = ['down', 'right', 'left'],
    bottomPole = ['up', 'right', 'left'],
    pole = {
        '0': [1, 2, 3],
        '1': [4, 5, 6],
        '2': [7, 8, 9]
    },
    className,
    row,
    obj = {
        'col': null,
        'cell': null
    },
    step = 0,
    stepDist,
    stepsWrap = document.querySelector('.steps'),
    timerId,
    stepArr,
    stepArrLength,
    check = true,
    result = {
        'col': null,
        'cell': null
    },
    click = false,
    btn = document.querySelector('.btn');

function nextStep() {
    if (step < 10) {
        if (obj.col === 0 && obj.cell === 0) {
            stepArr = leftTop;
        } else if (obj.col === 0 && obj.cell === 2) {
            stepArr = leftBottom;
        } else if (obj.col === 2 && obj.cell === 0) {
            stepArr = rightTop;
        } else if (obj.col === 2 && obj.cell === 2) {
            stepArr = rightBottom;
        } else if (obj.col === 0 && (obj.cell !== 2 || obj.cell !== 0)) {
            stepArr = left;
        } else if (obj.col === 2 && (obj.cell !== 2 || obj.cell !== 0)) {
            stepArr = right;
        } else if (obj.cell === 2 && (obj.col !== 2 || obj.col !== 0)) {
            stepArr = bottomPole;
        } else if (obj.cell === 0 && (obj.col !== 2 || obj.col !== 0)) {
            stepArr = topPole;
        } else {
            stepArr = all;
        }

        stepArrLength = stepArr.length;

        stepDist = Math.floor(Math.random() * (stepArrLength - 0));

        let stepSpan = document.createElement('div');
        stepSpan.innerText = stepArr[stepDist];
        stepSpan.style.marginLeft = '10px';
        stepSpan.style.padding = '5px';
        stepSpan.style.border = '1px solid #333';

        stepsWrap.appendChild(stepSpan);

        switch (stepArr[stepDist]) {
            case 'up':
                obj.cell = obj.cell - 1;
                break;
            case 'down':
                obj.cell = obj.cell + 1;
                break;
            case 'left':
                obj.col = obj.col - 1;
                break;
            default:
                obj.col = obj.col + 1;
                break;
        }

        step += 1;
    } else {
        clearInterval(timerId);

        click = true;
    }
}


function showClass(event) {
    let e = event.target;

    if (check) {
        if (!e.className.indexOf('index')) {
            className = e.className;

            let itemDiv = className.replace('index', '');

            timerId = setInterval(nextStep, 200);

            for (let i in pole) {
                row = pole[i];

                for (let item in row) {
                    if (row[item] === parseInt(itemDiv)) {
                        obj.col = parseInt(item);
                        obj.cell = parseInt(i);
                    }
                }
            }

            e.style.background = 'orange';
            check = false;
        }
    } else {
        if (!e.className.indexOf('index')) {
            className = e.className;

            let itemDiv = className.replace('index', '');

            for (let i in pole) {
                row = pole[i];

                for (let item in row) {
                    if (row[item] === parseInt(itemDiv)) {
                        result.col = parseInt(item);
                        result.cell = parseInt(i);
                    }
                }
            }
        }

        if (click) {
            if (obj.col === result.col && obj.cell === result.cell) {
                e.style.background = 'green';
                click = false;
                alert('Победа!!!');
                btnFun();
            } else {
                let dest = document.querySelector(`.index${pole[obj.cell][obj.col]}`);
                dest.style.background = 'green';
                e.style.background = 'red';
                click = false;
                alert('Проигрыш!!!');
                btnFun();
            }
        }
    }
}

function btnFun() {
    btn.style.display = 'inline-block';
}

btn.addEventListener('click', clear);

function clear() {
    step = 0;
    check = true;

    let bgItem = document.querySelectorAll('.row>div');

    for (let i = 0; i < bgItem.length; i++) {
        bgItem[i].style.backgroundColor = '#ff0';
    }

    while (stepsWrap.firstChild) {
        stepsWrap.removeChild(stepsWrap.firstChild);

        btn.style.display = 'none';
    }
}