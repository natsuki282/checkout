// TODO : ボタン押した時に勝手に追加されない仕様にしたい
round = []
multi_round = []
history_sum = []
recommend = []
numText = document.getElementById('num')
message = document.getElementById('message')
num = 0
no_arrange = [163, 166, 169, 172, 173, 175, 176, 178, 179, 181]

// 1~maxまでの数字を出す
function getRandInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function display() {
    sum = 0;
    // 4本目ならラウンドを変える
    if (round.length >= 4) {
        if (message.innerText != "") {
            return;
        }
        console.log(round);
        console.log(multi_round);
        for (let i = 0; i < 3; i++) {
            sum += round[i] * multi_round[i];
        }
        console.log(sum);
        round.splice(0, 3);
        multi_round.splice(0, 3);
        history_sum.push(sum);
    }

    sum = 0;
    for (let i = 0; i < 3; i++) {
        if (history_sum[i] == null) {
            document.getElementById('rst' + i).innerText = "";
        } else {
            sum += history_sum[i];
            document.getElementById('rst' + i).innerText = history_sum[i];
        }
        if (round[i] == null) {
            document.getElementById('rnd' + i).innerText = "";
        } else {
            sum += round[i] * multi_round[i];
            document.getElementById('rnd' + i).innerText = trans_multi(multi_round[i]) + round[i];
        }
    }
    dif = num - sum;
    numText.innerText = dif;
    // TODO :リコメンドの修正
    yet = ["未", "実", "装"]
    for (let i = 0; i < 3; i++) {
        if (no_arrange.includes(dif)) {
            document.getElementById('rec' + i).innerText = "-";
        } else {
            document.getElementById('rec' + i).innerText = yet[i];
        }
    }


    if (dif < 0) {
        message.innerText = "BUST";
    } else if (history_sum.length == 3 && dif > 0 && round.length == 3) {
        message.innerText = "ROUND OVER";
    } else if (dif == 0) {
        message.innerText = "CLEAR!"
    } else {
        message.innerText = "";
    }
}



function rand() {
    // 初期化
    round = []
    multi_round = []
    history_sum = []

    // 3本で上がれないやつなら延々ランダムに出し続ける

    do {
        num = getRandInt(180);
        if (document.getElementById("checkbox").checked) {
            num += 1;
        }
    } while (no_arrange.includes(num));


    display();
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

function push_normal_num(num, mul) {
    // CLEAR,BUST,ROUND OVERならreturn
    if (message.innerText != "") {
        return;
    }
    round.push(num);
    multi_round.push(mul);
}

function push_multi_num(mul) {
    if (message.innerText == "CLEAR") {
        return;
    }
    multi_round[multi_round.length - 1] = mul;
}

document.getElementById("label_out").addEventListener("click", function() {
    change_check();
});
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
                push_normal_num(i * 5 + j + 1, 1);
                display();
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
        // ×2
        if (i == 0) {
            newBtn.onclick = () => {
                push_multi_num(2);
                display();
            }
        }
        // ×3
        else if (i == 1) {
            newBtn.onclick = () => {
                push_multi_num(3);
                display();
            }
        }
        // ←
        else if (i == 2) {
            newBtn.onclick = () => {
                round.pop();
                multi_round.pop();
                display();
            }
        }
        // ×
        else if (i == 3) {
            newBtn.onclick = () => {
                round = [];
                multi_round = [];
                display();
            }
        }
        // RAND
        else {
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