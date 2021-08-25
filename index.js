function changeName(e) {
    const name = prompt('새로운 캐릭명을 입력하세요.');
    e.innerText = name;
    syncSession();
}

function add() {
    const target = document.querySelector('.t2 tbody');
    const name = prompt('캐릭명 or 직업명 or 편한이름');
    const cnt = target.querySelectorAll('tr').length;

    if (!name) {
        return;
    }

    const newTr = document.createElement('tr');
    newTr.innerHTML = `<tr>
    <td onclick="changeName(this)">${name}</td>
        <td><input type="checkbox" id="c${cnt}-todo_1"/><label for="c${cnt}-todo_1"></label></td>
        <td><input type="checkbox" id="c${cnt}-todo_2"/><label for="c${cnt}-todo_2"></label></td>
        <td><input type="checkbox" id="c${cnt}-todo_3"/><label for="c${cnt}-todo_3"></label></td>
        <td><input type="checkbox" id="c${cnt}-todo_4"/><label for="c${cnt}-todo_4"></label></td>
        <td><input type="checkbox" id="c${cnt}-todo_5"/><label for="c${cnt}-todo_5"></label></td>
        <td><input type="checkbox" id="c${cnt}-todo_6"/><label for="c${cnt}-todo_6"></label></td>
        <td><input type="checkbox" id="c${cnt}-todo_7"/><label for="c${cnt}-todo_7"></label></td>
        <td><input type="checkbox" id="c${cnt}-todo_8"/><label for="c${cnt}-todo_8"></label></td>
        <td onclick="del(this)">x</td>
    </tr>`;

    target.appendChild(newTr);

    newTr.querySelectorAll('input').forEach(el => {
        el.addEventListener('change', function () { 
            syncSession();
        });
    })

    syncSession();
}

function del(e) {
    const tr = e.parentElement;
    tr.parentElement.removeChild(tr);
    syncSession();
}

function syncSession() {
    const sessionForm = {
        t1: {
            todo0 : false,
            todo1 : false,
            todo2 : false,
        },
        t2: []
    };

    const t1_checkList = document.querySelectorAll('.t1 input');
    t1_checkList.forEach((el, idx) => {
        sessionForm.t1[`todo${idx}`] = el.checked;
    });

    const t2_row = document.querySelectorAll('.t2 tbody tr');
    t2_row.forEach(el1 => {
        let todoForm = {};
        el1.querySelectorAll('td').forEach((el2, idx) => {
            if (idx === 0) {
                todoForm.name = el2.innerText;
            } else {
                if (el2.querySelector('input')) {
                    todoForm[`todo${idx}`] = el2.querySelector('input').checked;
                }
            }  
        })
        sessionForm.t2.push(todoForm);
    })
    window.sessionStorage.setItem("todo", JSON.stringify(sessionForm));
}

//
(function () {

    const sessionForm = {
        t1: {
            todo1 : false,
            todo2 : false,
            todo3 : false,
        },
        t2: [
            // {
            //     name : 'none',
            //     todo1 : 0,
            //     todo2 : 0,
            //     todo3 : 0,
            //     todo4 : 0,
            //     todo5 : 0,
            //     todo6 : 0,
            //     todo7 : 0,
            //     todo8 : 0
            // }
        ]
    };

    if (window.sessionStorage.getItem("todo")) {
        const data = JSON.parse(window.sessionStorage.getItem("todo"));
        //동기화
        if (data) {
            const t1_checkList = document.querySelectorAll('.t1 input');
            t1_checkList.forEach((el, idx) => {
                el.checked = data.t1[`todo${idx}`];
            });
            if (data.t2.length > 0) {
                const t2_row = document.querySelectorAll('.t2 tbody tr');
                t2_row.forEach((el1, jdx) => {
                    el1.querySelectorAll('td').forEach((el2, idx) => {
                        if (idx === 0) {
                            el2.innerText = data.t2[jdx].name;
                        } else {
                            if (el2.querySelector('input')) {
                                el2.querySelector('input').checked = data.t2[jdx][`todo${idx}`];
                            }
                        }  
                    })
                })
            }
        }

    } else {
        window.sessionStorage.setItem("todo", JSON.stringify(sessionForm));
    }

    document.querySelectorAll('.t1 tr input').forEach(el => {
        el.addEventListener('change', function () { 
            syncSession();
        });
    })
    document.querySelectorAll('.t2 tbody input').forEach(el => {
        el.addEventListener('change', function () { 
            syncSession();
        });
    })
})()