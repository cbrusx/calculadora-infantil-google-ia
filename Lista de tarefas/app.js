// Elementos do DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const filterBtns = document.querySelectorAll('.filter-btn');
const pendingCount = document.getElementById('pending-count');
const totalInfo = document.getElementById('total-info');
const clearCompletedBtn = document.getElementById('clear-completed');

// Chave do LocalStorage
const STORAGE_KEY = 'todo_list_tasks';

// Estado da Aplicação
let tasks = [];
let currentFilter = 'all';

// Inicialização
function init() {
  const savedTasks = localStorage.getItem(STORAGE_KEY);
  
  if (savedTasks) {
    try {
      tasks = JSON.parse(savedTasks);
    } catch (e) {
      tasks = [];
    }
  } else {
    // Tarefas de exemplo na primeira visita para guiar o usuário
    tasks = [
      { id: Date.now() - 1000, text: 'Acompanhar as aulas da Imersão IA', completed: true },
      { id: Date.now(), text: 'Praticar criando novos projetos', completed: false }
    ];
    saveToStorage();
  }

  setupEventListeners();
  render();
}

// Salvar no LocalStorage
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Adicionar Nova Tarefa
function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  const newTask = {
    id: Date.now(),
    text: trimmed,
    completed: false
  };

  tasks.unshift(newTask);
  saveToStorage();
  render();
  
  taskInput.value = '';
  taskInput.focus();
}

// Alternar Conclusão da Tarefa
function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveToStorage();
  render();
}

// Remover Tarefa
function deleteTask(id, taskElement) {
  if (taskElement) {
    taskElement.classList.add('removing');
    setTimeout(() => {
      tasks = tasks.filter(task => task.id !== id);
      saveToStorage();
      render();
    }, 200);
  } else {
    tasks = tasks.filter(task => task.id !== id);
    saveToStorage();
    render();
  }
}

// Limpar Todas as Tarefas Concluídas
function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveToStorage();
  render();
}

// Atualizar Contadores e Rodapé
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  // Atualiza badge de pendentes
  pendingCount.textContent = pending === 1 ? '1 pendente' : `${pending} pendentes`;

  // Atualiza rodapé
  totalInfo.textContent = total === 1 ? '1 tarefa no total' : `${total} tarefas no total`;

  // Exibir ou ocultar botão de limpar concluídas
  if (completed > 0) {
    clearCompletedBtn.style.display = 'inline-block';
    clearCompletedBtn.textContent = `Limpar concluídas (${completed})`;
  } else {
    clearCompletedBtn.style.display = 'none';
  }
}

// Renderizar a Lista de Tarefas
function render() {
  // Filtra as tarefas de acordo com o filtro ativo
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'pending') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true; // 'all'
  });

  // Limpa a lista atual
  taskList.innerHTML = '';

  if (filteredTasks.length === 0) {
    emptyState.style.display = 'flex';
    
    // Mensagem dinâmica de acordo com o filtro
    const emptyTitle = emptyState.querySelector('h3');
    const emptyDesc = emptyState.querySelector('p');

    if (currentFilter === 'completed') {
      emptyTitle.textContent = 'Nenhuma tarefa concluída';
      emptyDesc.textContent = 'Marque uma tarefa como concluída para visualizá-la aqui.';
    } else if (currentFilter === 'pending') {
      emptyTitle.textContent = 'Tudo em dia!';
      emptyDesc.textContent = 'Você não possui tarefas pendentes no momento.';
    } else {
      emptyTitle.textContent = 'Nenhuma tarefa cadastrada';
      emptyDesc.textContent = 'Digite uma atividade acima e clique em "Adicionar" para começar.';
    }
  } else {
    emptyState.style.display = 'none';

    filteredTasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;
      li.dataset.id = task.id;

      // Container esquerdo (checkbox + texto)
      const leftDiv = document.createElement('div');
      leftDiv.className = 'task-left';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'custom-checkbox';
      checkbox.checked = task.completed;
      checkbox.setAttribute('aria-label', `Marcar "${task.text}" como concluída`);

      const textSpan = document.createElement('span');
      textSpan.className = 'task-text';
      textSpan.textContent = task.text;

      // Ações ao clicar no texto ou no checkbox
      checkbox.addEventListener('change', () => toggleTask(task.id));
      textSpan.addEventListener('click', () => toggleTask(task.id));

      leftDiv.appendChild(checkbox);
      leftDiv.appendChild(textSpan);

      // Botão de excluir
      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'task-actions';

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn-delete';
      deleteBtn.setAttribute('aria-label', `Excluir tarefa "${task.text}"`);
      deleteBtn.setAttribute('title', 'Excluir tarefa');
      deleteBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      `;

      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTask(task.id, li);
      });

      actionsDiv.appendChild(deleteBtn);

      li.appendChild(leftDiv);
      li.appendChild(actionsDiv);
      taskList.appendChild(li);
    });
  }

  updateStats();
}

// Configuração dos Eventos
function setupEventListeners() {
  // Envio do formulário
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(taskInput.value);
  });

  // Filtros
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      render();
    });
  });

  // Limpar Concluídas
  clearCompletedBtn.addEventListener('click', clearCompleted);
}

// Inicia a aplicação
document.addEventListener('DOMContentLoaded', init);
