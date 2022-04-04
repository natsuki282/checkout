result = []
multi_result = []
numText = document.getElementById('num')
num = 0

function getRandInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function calc() {
    buff = num;
    console.log(result);
    for (let i = 0; i < result.length; i++) {
        buff -= result[i] * multi_result[i];
    }
    return buff;
}
window.onload = function() {
    button_area = document.getElementById('result');
    for (let i = 0; i < 4; i++) {
        const newDiv = document.createElement("div");
        for (let j = 0; j < 5; j++) {
            const newBtn = document.createElement("button");
            newBtn.innerHTML = i * 5 + j + 1;
            newBtn.onclick = () => {
                result.push(i * 5 + j + 1);
                multi_result.push(1)
                numText.textContent = calc();
            }
            newDiv.appendChild(newBtn);
        }
        button_area.appendChild(newDiv);
    }
    const newDiv = document.createElement("div");
    const newBtn2 = document.createElement("button");
    const newBtn3 = document.createElement("button");
    const newBtn4 = document.createElement("button");
    newBtn2.innerHTML = "×2"
    newBtn3.innerHTML = "×3"
    newBtn4.innerHTML = "←"
    newBtn2.onclick = () => {
        multi_result[multi_result.length - 1] = 2;
        numText.textContent = calc()
    }
    newBtn3.onclick = () => {
        multi_result[multi_result.length - 1] = 3;
        numText.textContent = calc()
    }
    newBtn4.onclick = () => {
        result.pop();
        multi_result.pop();
        numText.textContent = calc()
    }
    newDiv.appendChild(newBtn2);
    newDiv.appendChild(newBtn3);
    newDiv.appendChild(newBtn4);
    button_area.appendChild(newDiv);
}

document.querySelector('#rand').addEventListener('click', function() {
    result = []
    radio = document.getElementsByName('out')
    dart = 0;
    for (let i = 0; i < radio.length; i++) {
        if (radio.item(i).checked) {
            dart = radio.item(i).value;
            break;
        }
    }
    console.log(dart);
    display = "";
    for (let i = 0; i < dart; i++) {
        if (i == dart - 1) {
            multi = getRandInt(2) + 1;
        } else {
            multi = getRandInt(3);
        }
        main = getRandInt(20);

        display += "<a>[" + main + " × " + multi + "]</a>";
        num += main * multi
    }
    numText.innerHTML = num;
    document.getElementById("ans").innerHTML = display;
});