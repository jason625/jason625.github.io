function changeName(e) {
    const name = prompt('새로운 캐릭명을 입력하세요.');
    e.innerText = name;
    syncStorage();
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
            syncStorage();
        });
    })

    syncStorage();
}

function del(e) {
    const tr = e.parentElement;
    tr.parentElement.removeChild(tr);
    syncStorage();
}

function syncStorage() {
    const storageForm = {
        t1: {
            todo0 : false,
            todo1 : false,
            todo2 : false,
        },
        t2: []
    };

    const t1_checkList = document.querySelectorAll('.t1 input');
    t1_checkList.forEach((el, idx) => {
        storageForm.t1[`todo${idx}`] = el.checked;
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
        storageForm.t2.push(todoForm);
    })
    window.localStorage.setItem("todo", JSON.stringify(storageForm));
}

//
(function () {

    const storageForm = {
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

    if (window.localStorage.getItem("todo")) {
        const data = JSON.parse(window.localStorage.getItem("todo"));
        //동기화
        if (data) {
            const t1_checkList = document.querySelectorAll('.t1 input');
            t1_checkList.forEach((el, idx) => {
                el.checked = data.t1[`todo${idx}`];
            });
            if (data.t2.length > 0) {
                // const t2_row = document.querySelectorAll('.t2 tbody tr');
                // t2_row.forEach((el1, jdx) => {
                //     el1.querySelectorAll('td').forEach((el2, idx) => {
                //         if (idx === 0) {
                //             el2.innerText = data.t2[jdx].name;
                //         } else {
                //             if (el2.querySelector('input')) {
                //                 el2.querySelector('input').checked = data.t2[jdx][`todo${idx}`];
                //             }
                //         }  
                //     })
                // })
                const target = document.querySelector('.t2 tbody');
                data.t2.forEach((el, idx) => {
                    const newTr = document.createElement('tr');
                    newTr.innerHTML = `<tr>
                    <td onclick="changeName(this)">${el.name}</td>
                        <td><input type="checkbox" id="c${idx}-todo_1" ${el.todo1 ? 'checked' : '' }/><label for="c${idx}-todo_1"></label></td>
                        <td><input type="checkbox" id="c${idx}-todo_2" ${el.todo1 ? 'checked' : '' }/><label for="c${idx}-todo_2"></label></td>
                        <td><input type="checkbox" id="c${idx}-todo_3" ${el.todo3 ? 'checked' : '' }/><label for="c${idx}-todo_3"></label></td>
                        <td><input type="checkbox" id="c${idx}-todo_4" ${el.todo4 ? 'checked' : '' }/><label for="c${idx}-todo_4"></label></td>
                        <td><input type="checkbox" id="c${idx}-todo_5" ${el.todo5 ? 'checked' : '' }/><label for="c${idx}-todo_5"></label></td>
                        <td><input type="checkbox" id="c${idx}-todo_6" ${el.todo1 ? 'checked' : '' }/><label for="c${idx}-todo_6"></label></td>
                        <td><input type="checkbox" id="c${idx}-todo_7" ${el.todo1 ? 'checked' : '' }/><label for="c${idx}-todo_7"></label></td>
                        <td><input type="checkbox" id="c${idx}-todo_8" ${el.todo1 ? 'checked' : '' }/><label for="c${idx}-todo_8"></label></td>
                        <td onclick="del(this)">x</td>
                    </tr>`;
    
                    target.appendChild(newTr);
                }) 
            }
        }

    } else {
        window.localStorage.setItem("todo", JSON.stringify(storageForm));
    }

    document.querySelectorAll('.t1 tr input').forEach(el => {
        el.addEventListener('change', function () { 
            syncStorage();
        });
    })
    document.querySelectorAll('.t2 tbody input').forEach(el => {
        el.addEventListener('change', function () { 
            syncStorage();
        });
    })
})()