const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-btn');

taskForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const task = taskInput.value.trim();

  if (task !== '') {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.addEventListener('change', function() {
      if (taskCheckbox.checked) {
        taskItem.classList.add('completed');
      } else {
        taskItem.classList.remove('completed');
      }
    });

    const taskText = document.createElement('span');
    taskText.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      taskList.removeChild(taskItem);
    });

    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);

    taskInput.value = '';
  }
});

filterButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    const filter = button.dataset.filter;
    const taskItems = taskList.querySelectorAll('.task-item');

    taskItems.forEach(function(taskItem) {
      taskItem.style.display = 'block';

      if (filter === 'active' && taskItem.classList.contains('completed')) {
        taskItem.style.display = 'none';
      } else if (filter === 'completed' && !taskItem.classList.contains('completed')) {
        taskItem.style.display = 'none';
      }
    });

    filterButtons.forEach(function(btn) {
      btn.classList.remove('active');
    });

    button.classList.add('active');
  });
});
