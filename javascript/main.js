const boards = document.querySelector('.boards');
const boardsItem = document.querySelectorAll('.boards__item');
const button = document.querySelector('.button');


const findLists = (lists) => {
    lists.forEach(list => {
        list.addEventListener('click', addEventListeners); // при клике на один блок именно на этом блоке создадуться все слушатели кнопок и текстерия
    });
};

findLists(boardsItem);

function addEventListeners(e) {
        const textarea = e.currentTarget.querySelector('.textarea');
        const buttonAdd = e.currentTarget.querySelector('.add__item-btn');
        const list = e.currentTarget.querySelector('.list');
        const form = e.currentTarget.querySelector('.form');
        const addButton = e.currentTarget.querySelector('.add-btn');
        const cancel = e.currentTarget.querySelector('.cancel__item-btn');

        textarea.addEventListener('input', activeButton);
        function activeButton() {
            let value = textarea.value.trim();
            if(value.length !== 0) {
                buttonAdd.style.opacity = 1;
                buttonAdd.disabled = false;
            } else if(value.length === 0) {
                buttonAdd.style.opacity = 0.5;
                buttonAdd.disabled = true;
            }
        };


        buttonAdd.addEventListener('click', addNewText);

        function addNewText() {
            if(textarea.value){
                list.insertAdjacentHTML('beforeend', `
                <div class="list__item" id=${textarea.value + Math.random() * 4} draggable="true">
                    <div>${textarea.value}</div>
                    <div class="imgdiv"><img src="./img/trash.png" alt="delet"></div>
                </div>
            `)
                buttonAdd.style.opacity = 0.5;
                buttonAdd.disabled = true;
                textarea.value = '';
                form.classList.add('none');
                addButton.style.display = 'flex';
                dragNdrop();
            }
    }

        if(e.target.closest('.add-btn')) {
            form.classList.remove('none');
            e.target.closest('.add-btn').style.display = 'none'
        }

        addButton.addEventListener('click', showform);
        function showform() {
                form.classList.remove('none');
                addButton.style.display = 'none'

        }

        
        cancel.addEventListener('click', hideform);
        function hideform() {
            form.classList.add('none');
            addButton.style.display = 'flex';
            textarea.value = '';
        };


        list.addEventListener('dblclick', deletEl);

        function deletEl(e) {
            if(e.target.closest('img')) {
                e.target.closest('.list__item').remove()
            }
        }

        e.currentTarget.removeEventListener('click', addEventListeners);
};


button.addEventListener('click', () => {
    const html = `
        <div class="boards__item" id=${new Date() + Math.random * 5}>
            <img src="./img/delete.png" class="delete" alt="delete">
            <span contenteditable="true" class="title">имя</span>
            <div class="list">
            </div>

            <div class="form none">
                <textarea class="textarea" placeholder="введите название карточки"></textarea>
                <div class="buttons">
                    <button disabled class="add__item-btn">добавить карточку</button>
                    <button class="cancel__item-btn">отмена</button>
                </div>
            </div>
            <div class="add-btn"><span> + </span> добавить карточку</div>
        </div>
    `;
    boards.insertAdjacentHTML('beforeend', html);
    chackLength();
    dragNdrop();
    getAllBlock();
});

const chackLength = () => {
    const boardsItem = document.querySelectorAll('.boards__item');
    if(boardsItem.length == 6) {
        button.style.display = 'none'
    } else {
        button.style.display = 'flex'
    }
    findLists(boardsItem);
};

let draggedItem = null;

const dragNdrop = () => {
    const lists = document.querySelectorAll('.list');
    const listItem = document.querySelectorAll('.list__item');

    for (let i = 0; i < listItem.length; i++) {
        const item = listItem[i];

        item.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() => {
                item.style.display = 'none';
            }, 0)
        })
        item.addEventListener('dragend', () => {
            setTimeout(() =>{
                item.style.display = 'grid';
                draggedItem
            },0)
        })
    }
    for (let j = 0; j < lists.length; j++) {
        const list = lists[j];

        list.addEventListener('dragover', e => e.preventDefault())
        list.addEventListener('dragenter', function (e) {
            e.preventDefault();
            this.style.backgroundColor = 'rgba(0,0,0, 0.4)'
        });
        list.addEventListener('dragleave', function () {
            this.style.backgroundColor = '';
        })
        list.addEventListener('drop', function () {
            this.style.backgroundColor = '';
            this.append(draggedItem);
        })
    }
};

function getAllBlock() {
    const boards = document.querySelector('.boards');
    boards.addEventListener('click', function(e) {
        if(e.target.closest('.delete')) {
            e.target.closest('.boards__item').remove()
        }
        chackLength();
    })
};

getAllBlock();

dragNdrop();

