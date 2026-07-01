// ===============================
// 前回のペア
// ===============================

let lastPairs = [];


// ===============================
// HTML取得
// ===============================

const randomBtn = document.getElementById("randomBtn");


// ===============================
// イベント
// ===============================

randomBtn.addEventListener("click", makeSeats);


// ===============================
// 席替え開始
// ===============================

function makeSeats(){

    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);

    const tripleSeat =
        document.getElementById("tripleSeat").checked;

    const avoidLast =
        document.getElementById("avoidLastPair").checked;

    let members = students.filter(student => student.join);

    const seatCount = rows * cols;

    if(members.length > seatCount * 2){

        alert("席数が足りません。");

        return;

    }

    let groups = [];

    let success = false;

    // 最大1000回まで組み直す
    for(let retry = 0; retry < 1000; retry++){

        let list = [...members];

        shuffle(list);

        groups = createGroups(list, tripleSeat);

        if(checkGroups(groups, avoidLast)){

            success = true;

            break;

        }

    }

    if(!success){

        alert("条件を満たす組み合わせが見つかりませんでした。");

        return;

    }

    saveLastPairs(groups);

    drawSeats(groups, rows, cols);

}



// ===============================
// シャッフル
// ===============================

function shuffle(array){

    for(let i=array.length-1;i>0;i--){

        const j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]]=[array[j],array[i]];

    }

}



// ===============================
// グループ作成
// ===============================

function createGroups(list, tripleSeat){

    const groups = [];

    if(tripleSeat && list.length % 2 === 1){

        const tripleIndex =
            Math.floor(Math.random() * ((list.length-1)/2));

        let count = 0;

        for(let i=0;i<list.length;i+=2){

            if(count === tripleIndex){

                groups.push([
                    list[i],
                    list[i+1],
                    list[i+2]
                ]);

                i++;

            }else{

                groups.push([
                    list[i],
                    list[i+1]
                ]);

            }

            count++;

        }

    }else{

        for(let i=0;i<list.length;i+=2){

            groups.push([
                list[i],
                list[i+1]
            ]);

        }

    }

    return groups;

}



// ===============================
// 条件チェック
// ===============================

function checkGroups(groups, avoidLast){

    for(const group of groups){

        const names = group
            .filter(student => student)
            .map(student => student.name);

        // 禁止ペア
        for(let i=0;i<names.length;i++){

            for(let j=i+1;j<names.length;j++){

                if(isForbidden(names[i], names[j])){

                    return false;

                }

            }

        }

        // 前回と同じペア
        if(avoidLast){

            for(let i=0;i<names.length;i++){

                for(let j=i+1;j<names.length;j++){

                    if(isLastPair(names[i], names[j])){

                        return false;

                    }

                }

            }

        }

    }

    return true;

}
// ===============================
// 前回ペア保存
// ===============================

function saveLastPairs(groups){

    lastPairs = [];

    groups.forEach(group => {

        for(let i = 0; i < group.length; i++){

            for(let j = i + 1; j < group.length; j++){

                lastPairs.push([
                    group[i].name,
                    group[j].name
                ]);

            }

        }

    });

}



// ===============================
// 前回ペア判定
// ===============================

function isLastPair(name1,name2){

    return lastPairs.some(pair =>

        (pair[0] === name1 && pair[1] === name2) ||

        (pair[0] === name2 && pair[1] === name1)

    );

}



// ===============================
// 席表示
// ===============================

function drawSeats(groups, rows, cols){

    seatArea.innerHTML = "";

    seatArea.style.gridTemplateColumns =
        `repeat(${cols}, 180px)`;

    const totalSeats = rows * cols;

    while(groups.length < totalSeats){

        groups.push([]);

    }

    groups.forEach((group,index)=>{

        const seat = document.createElement("div");

        seat.classList.add("seat");

        if(group.length === 3){

            seat.classList.add("triple");

        }

        if(group.length === 0){

            seat.classList.add("empty");

            seat.innerHTML = `
                <div class="seat-number">
                    ${index + 1}
                </div>

                <div class="empty-text">
                    空席
                </div>
            `;

        }else{

            let html = `
                <div class="seat-number">
                    ${index + 1}
                </div>
            `;

            group.forEach(student=>{

                html += `
                    <div class="student-name">
                        ${student.name}
                    </div>
                `;

            });

            seat.innerHTML = html;

        }

        seatArea.appendChild(seat);

    });

}



// ===============================
// 席をリセット
// ===============================

function clearSeats(){

    seatArea.innerHTML = "";

}



// ===============================
// 前回ペア初期化
// ===============================

function resetLastPairs(){

    lastPairs = [];

}