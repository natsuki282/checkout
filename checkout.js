result = []
multi_result = []
round = []
numText = document.getElementById('num')
num = 0
no_arrange = [163, 166, 169, 172, 173, 175, 176, 178, 179]

function getRandInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function calc() {
    buff = num;
    // TODO : 4本目ならラウンドを変える
    if (result.length > 3) {
        result = [];
        multi_result = [];
    } else {
        for (let i = 0; i < result.length; i++) {
            document.getElementById('rnd' + i).innerText = trans_multi(multi_result[i]) + result[i];
            buff -= result[i] * multi_result[i];
            if (buff <= 0) {
                break;
            }
        }
        if (buff < 0) {
            buff = "BUST";
        }
    }

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
                console.log(i * 5 + j + 1)
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
    change_check();
}

function rand() {
    result = []
    multi_result = []
    num = 0;
    dart = 3;
    display = "";
    for (let i = 0; i < dart; i++) {
        if (i == dart - 1) {
            multi = getRandInt(2) + 1;
        } else {
            multi = getRandInt(3);
        }
        main = getRandInt(20);
        document.getElementById("rec" + i).innerText = trans_multi(multi) + main;
        num += main * multi
    }
    numText.innerHTML = num;
    calc();
}

function trans_multi(num) {
    if (num == 1) {
        arr = "S";
    } else if (num == 2) {
        arr = "D";
    } else {
        arr = "T";
    }
    return arr;
}

// Master out のチェックボックス
function change_check() {
    label = document.getElementById("label_out");
    if (document.getElementById("checkbox").checked) {
        label.style.color = "#cf4242";
        label.style.textDecorationColor = "#cf4242";
        label.style.textDecoration = "underline";
    } else {
        label.style.color = "#6b6b6b";
        label.style.textDecoration = "none";
    }
}

document.getElementById("label_out").addEventListener("click", function() {
    change_check();
});