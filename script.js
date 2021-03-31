if (localStorage.getItem('items') === null)
  localStorage.setItem('items', JSON.stringify([]));

renderItems();

function showForm(btn) {
  const form = document.querySelector('form');
  const icon = document.createElement('i');
  icon.className = 'fas fa-plus fa-2x color-success';

  if (btn.textContent === 'Cancel') {
    //reset the form if the user clicks cancel
    form.reset();
    form.style.display = 'none';

    btn.textContent = '';
    btn.appendChild(icon);
    return;
  }

  btn.removeChild(btn.firstChild);
  btn.textContent = 'Cancel';
  form.style.display = 'inline-block';
}

function addItem(event) {
  event.preventDefault();
  let items = JSON.parse(localStorage.getItem('items'));
  const newTodo = {
    id: items.length + 1,
    name: event.target[0].value,
    complete: false,
  };
  items.push(newTodo);
  localStorage.setItem('items', JSON.stringify(items));
  renderItems();
  document.querySelector('form').reset();
}

function removeItem(event) {
  let items = JSON.parse(localStorage.getItem('items'));
  items = items.filter(
    item => item.id != event.currentTarget.parentElement.dataset.id
  );
  localStorage.setItem('items', JSON.stringify(items));
  renderItems();
}

function markComplete(event) {
  let items = JSON.parse(localStorage.getItem('items'));
  const text = event.target.textContent;
  const index = items.findIndex(item => item.name === text);

  if (index !== -1) items[index].complete = !items[index].complete;

  localStorage.setItem('items', JSON.stringify(items));
  renderItems();
}

function preventSubmit(event) {
  event.preventDefault();
  return false;
}

function filterItems(event) {
  renderItems(event.target.value);
}

function renderItems(filterValue = null) {
  const items = JSON.parse(localStorage.getItem('items'));
  const list = document.querySelector('#todo-list');

  while (list.firstChild) list.removeChild(list.firstChild);

  if (items.length === 0) {
    const prompt = document.createElement('h2');
    prompt.className = 'todo__prompt';
    prompt.textContent = 'Your list is empty';
    list.appendChild(prompt);
  }
  if (filterValue) {
    items
      .filter(item =>
        item.name.toLowerCase().includes(filterValue.toLowerCase())
      )
      .forEach(item => {
        const itemElement = document.createElement('article');
        itemElement.className = 'todo__item flex';
        itemElement.setAttribute('data-id', `${item.id}`);

        const nameBtn = document.createElement('button');
        nameBtn.className = `btn todo__item-name ${
          item.complete ? 'todo__item-name--complete' : ''
        }`;
        nameBtn.addEventListener('click', markComplete);
        const p = document.createElement('p');
        p.textContent = `${item.name}`;
        nameBtn.appendChild(p);

        const removeBtn = document.createElement('button');
        const icon = document.createElement('i');
        icon.className = 'fas fa-minus-circle';
        removeBtn.className = 'btn todo__btn-remove';
        removeBtn.appendChild(icon);
        removeBtn.addEventListener('click', removeItem);

        itemElement.appendChild(nameBtn);
        itemElement.appendChild(removeBtn);
        list.appendChild(itemElement);
      });
  } else {
    items.forEach(item => {
      const itemElement = document.createElement('article');
      itemElement.className = 'todo__item flex';
      itemElement.setAttribute('data-id', `${item.id}`);

      const nameBtn = document.createElement('button');
      nameBtn.className = `btn todo__item-name ${
        item.complete ? 'todo__item-name--complete' : ''
      }`;
      nameBtn.addEventListener('click', markComplete);
      const p = document.createElement('p');
      p.textContent = `${item.name}`;
      nameBtn.appendChild(p);

      const removeBtn = document.createElement('button');
      const icon = document.createElement('i');
      icon.className = 'fas fa-minus-circle';
      removeBtn.className = 'btn todo__btn-remove';
      removeBtn.appendChild(icon);
      removeBtn.addEventListener('click', removeItem);

      itemElement.appendChild(nameBtn);
      itemElement.appendChild(removeBtn);
      list.appendChild(itemElement);
    });
  }
}
