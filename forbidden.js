// ===============================
// 禁止ペアデータ
// ===============================

const forbiddenPairs = [];


// ===============================
// HTML取得
// ===============================

const addForbiddenBtn =
document.getElementById("addForbiddenBtn");

const forbiddenList =
document.getElementById("forbiddenList");


// ===============================
// イベント
// ===============================

addForbiddenBtn.addEventListener("click", addForbiddenPair);


// ===============================
// 禁止ペア追加
// ===============================

function addForbiddenPair(){

    const name1 = student1.value;
    const name2 = student2.value;

    if(name1 === "" || name2 === ""){

        alert("生徒を選択してください");

        return;

    }

    if(name1 === name2){

        alert("同じ人は選べません");

        return;

    }

    // 重複チェック
    const exists = forbiddenPairs.some(pair =>

        (pair[0] === name1 && pair[1] === name2) ||

        (pair[0] === name2 && pair[1] === name1)

    );

    if(exists){

        alert("その禁止ペアは登録済みです");

        return;

    }

    forbiddenPairs.push([name1, name2]);

    renderForbiddenList();

}


// ===============================
// 一覧表示
// ===============================

function renderForbiddenList(){

    forbiddenList.innerHTML = "";

    forbiddenPairs.forEach((pair,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
            ${pair[0]} × ${pair[1]}
            <button onclick="deleteForbiddenPair(${index})">
                削除
            </button>
        `;

        forbiddenList.appendChild(li);

    });

}


// ===============================
// 削除
// ===============================

window.deleteForbiddenPair = function(index){

    forbiddenPairs.splice(index,1);

    renderForbiddenList();

}


// ===============================
// 禁止ペア判定
// ===============================

function isForbidden(name1,name2){

    return forbiddenPairs.some(pair=>

        (pair[0]===name1 && pair[1]===name2) ||

        (pair[0]===name2 && pair[1]===name1)

    );

}