// ===============================
// データ
// ===============================

const students = [];


// ===============================
// HTML取得
// ===============================

const nameInput = document.getElementById("nameInput");
const addBtn = document.getElementById("addBtn");
const testBtn = document.getElementById("testBtn");

const studentList = document.getElementById("studentList");

const student1 = document.getElementById("student1");
const student2 = document.getElementById("student2");


// ===============================
// イベント
// ===============================

addBtn.addEventListener("click", addStudent);

testBtn.addEventListener("click", addTestData);

nameInput.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        addStudent();

    }

});


// ===============================
// 生徒追加
// ===============================

function addStudent(){

    const name = nameInput.value.trim();

    if(name === ""){

        alert("名前を入力してください");

        return;

    }

    students.push({

        name:name,

        join:true

    });

    nameInput.value="";

    renderStudentList();

}


// ===============================
// 生徒一覧表示
// ===============================

function renderStudentList(){

    studentList.innerHTML="";

    students.forEach((student,index)=>{

        const tr=document.createElement("tr");

        tr.innerHTML=`

            <td>

                <input
                    type="checkbox"
                    ${student.join ? "checked" : ""}
                    onchange="toggleJoin(${index})">

            </td>

            <td>

                ${student.name}

            </td>

            <td>

                <button onclick="deleteStudent(${index})">

                    削除

                </button>

            </td>

        `;

        studentList.appendChild(tr);

    });

    updateSelectBox();

}


// ===============================
// 参加切替
// ===============================

window.toggleJoin=function(index){

    students[index].join=!students[index].join;

}


// ===============================
// 生徒削除
// ===============================

window.deleteStudent=function(index){

    students.splice(index,1);

    renderStudentList();

}
// ===============================
// テストデータ
// ===============================

function addTestData(){

    students.length = 0;

    for(let i = 1; i <= 21; i++){

        students.push({

            name : "生徒" + i,

            join : true

        });

    }

    renderStudentList();

}



// ===============================
// 禁止ペア用プルダウン更新
// ===============================

function updateSelectBox(){

    student1.innerHTML = "";
    student2.innerHTML = "";

    students.forEach(student => {

        const option1 = document.createElement("option");
        option1.value = student.name;
        option1.textContent = student.name;

        const option2 = document.createElement("option");
        option2.value = student.name;
        option2.textContent = student.name;

        student1.appendChild(option1);
        student2.appendChild(option2);

    });

}



// ===============================
// 全員参加
// ===============================

function joinAll(){

    students.forEach(student=>{

        student.join = true;

    });

    renderStudentList();

}



// ===============================
// 全員不参加
// ===============================

function leaveAll(){

    students.forEach(student=>{

        student.join = false;

    });

    renderStudentList();

}



// ===============================
// 全削除
// ===============================

function deleteAllStudents(){

    if(!confirm("参加者を全員削除しますか？")){

        return;

    }

    students.length = 0;

    renderStudentList();

}