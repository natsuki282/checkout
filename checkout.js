result = []
multi_result = []
numText = document.getElementById('num')
num = 0

function getRandInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function calc() {
    buff = num;
    display = "";
    for (let i = 0; i < result.length; i++) {
        display += "[" + result[i] + "×" + multi_result[i] + "]";
        buff -= result[i] * multi_result[i];
        if (buff <= 0) {
            break;
        }
    }
    if (display == "") {
        display = "[]";
    }
    if (buff < 0) {
        buff = "BUST";
    }
    document.getElementById('dart').textContent = display;

    return buff;
}
window.onload = function() {
    button_area = document.getElementById('button_area');
    for (let i = 0; i < 4; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("div_button");

        for (let j = 0; j < 5; j++) {
            const newBtn = document.createElement("a");
            newBtn.classList.add("button");

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
    newDiv.classList.add("div_button");

    buttonText = ["×2", "×3", "←", "×", "RAND"];
    for (let i = 0; i < buttonText.length; i++) {
        const newBtn = document.createElement("a");
        newBtn.innerHTML = buttonText[i];
        newBtn.classList.add("button");
        if (i == 0) {
            newBtn.onclick = () => {
                multi_result[multi_result.length - 1] = 2;
                numText.textContent = calc()
            }
        } else if (i == 1) {
            newBtn.onclick = () => {
                multi_result[multi_result.length - 1] = 3;
                numText.textContent = calc()
            }
        } else if (i == 2) {
            newBtn.onclick = () => {
                result.pop();
                multi_result.pop();
                numText.textContent = calc()
            }
        } else if (i == 3) {
            newBtn.onclick = () => {
                result = [];
                multi_result = [];
                numText.textContent = calc()
            }
        } else {
            newBtn.onclick = () => {
                rand();
            }
        }
        newDiv.appendChild(newBtn);
    }

    button_area.appendChild(newDiv);
    rand();
    change_radio();
}

function rand() {
    result = []
    multi_result = []
    num = 0;
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
    calc();
}

function change_radio() {
    radio = document.getElementsByName("out");
    for (let i = 0; i < radio.length; i++) {
        id = "radio" + i
        label = document.getElementById(id);
        if (radio.item(i).checked) {
            label.style.color = "#cf4242";
            label.style.textDecorationColor = "#cf4242";
            label.style.textDecoration = "underline";
        } else {
            label.style.color = "#6b6b6b";
            label.style.textDecoration = "none";
        }
    }
    rand();
}
document.getElementById("radio0").addEventListener("click", function() {
    change_radio();
});
document.getElementById("radio1").addEventListener("click", function() {
    change_radio();
});
document.getElementById("radio2").addEventListener("click", function() {
    change_radio();
});
