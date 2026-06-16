// ==========================================================================
// Git & GitHub Interactive Lab - Simulation Engine
// ==========================================================================

// --- State Variables ---
let vfs = {
  'index.html': {
    content: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Meu Web App</title>\n</head>\n<body>\n  <h1>Olá Mundo!</h1>\n</body>\n</html>`,
    lastSavedContent: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Meu Web App</title>\n</head>\n<body>\n  <h1>Olá Mundo!</h1>\n</body>\n</html>`
  },
  'readme.md': {
    content: `# Git & GitHub Project\n\nEste é um repositório simulado para o laboratório de Git e GitHub.`,
    lastSavedContent: `# Git & GitHub Project\n\nEste é um repositório simulado para o laboratório de Git e GitHub.`
  }
};

let gitState = {
  config: {
    username: '',
    email: ''
  },
  isInitialized: false,
  isCloned: false,
  clonedFromUrl: '',
  remoteUrl: '',
  branch: 'main',
  workingDirectory: {}, // filename -> 'modified' | 'untracked'
  stagingArea: {},      // filename -> content
  commits: [],          // array of { hash, message, author, date, files: { filename: content } }
  
  // GitHub simulated remote state
  remote: {
    connected: false,
    repoName: 'luisflv/project-repo',
    commits: [],        // Remote commits
    files: {}           // Remote file state
  }
};

// Available levels definition
const levels = [
  {
    id: 1,
    title: '1. Configurações Iniciais (git config)',
    description: 'Antes de registrar qualquer alteração no Git, você precisa se identificar configurando seu nome de usuário e email. Isso garantirá que seus commits sejam associados à sua conta.',
    tip: 'Digite: <span class="cmd-highlight">git config --global user.name "Seu Nome"</span> e depois <span class="cmd-highlight">git config --global user.email "seuemail@exemplo.com"</span>.',
    objectives: [
      { id: 'config-name', text: 'Configurar o nome de usuário (user.name)', checked: false },
      { id: 'config-email', text: 'Configurar o email do usuário (user.email)', checked: false }
    ],
    validator: () => {
      return gitState.config.username !== '' && gitState.config.email !== '';
    }
  },
  {
    id: 2,
    title: '2. Iniciar Repositório (git init)',
    description: 'Agora que você está configurado, vamos iniciar um repositório local. O comando <span class="cmd-highlight">git init</span> cria uma pasta oculta chamada <span class="cmd-highlight">.git</span> no seu projeto. Ela conterá todo o histórico e metadados.',
    tip: 'Digite o comando <span class="cmd-highlight">git init</span> no terminal para começar o rastreamento dos arquivos.',
    objectives: [
      { id: 'git-init', text: 'Iniciar um repositório Git local', checked: false }
    ],
    validator: () => {
      return gitState.isInitialized;
    }
  },
  {
    id: 3,
    title: '3. Clonar Repositório (git clone)',
    description: 'E se o projeto já existir na internet e você quiser baixá-lo? Usamos o comando <span class="cmd-highlight">git clone</span>. Neste passo, vamos simular que estamos clonando o repositório existente no GitHub para o nosso diretório local.',
    tip: 'Digite <span class="cmd-highlight">git clone https://github.com/luisflv/project-repo.git</span> para copiar o projeto remoto para seu computador.',
    objectives: [
      { id: 'git-clone', text: 'Clonar o repositório remoto da URL fornecida', checked: false }
    ],
    validator: () => {
      return gitState.isCloned;
    }
  },
  {
    id: 4,
    title: '4. Preparar Alterações (git add)',
    description: 'Quando alteramos um arquivo, ele fica no "Working Directory". Para incluí-lo no próximo commit, precisamos colocá-lo na "Staging Area" (área de preparação). Vamos fazer isso salvando alterações e usando <span class="cmd-highlight">git add</span>.',
    tip: 'Edite o arquivo no editor de código acima, salve-o clicando em "Salvar Arquivo", e digite <span class="cmd-highlight">git add index.html</span> ou <span class="cmd-highlight">git add .</span> no terminal.',
    objectives: [
      { id: 'edit-file', text: 'Editar e salvar qualquer arquivo (ex: index.html)', checked: false },
      { id: 'git-add', text: 'Adicionar a alteração à Staging Area usando git add', checked: false }
    ],
    validator: () => {
      return Object.keys(gitState.stagingArea).length > 0;
    }
  },
  {
    id: 5,
    title: '5. Confirmar Alterações (git commit)',
    description: 'Com seus arquivos na Staging Area, você está pronto para tirar um "snapshot" (foto) do estado atual do seu projeto. O comando <span class="cmd-highlight">git commit</span> grava permanentemente essas alterações no histórico do seu repositório local.',
    tip: 'Execute <span class="cmd-highlight">git commit -m "Mensagem do commit explicando a alteração"</span> no terminal para salvar no seu repositório local.',
    objectives: [
      { id: 'git-commit', text: 'Criar um commit com uma mensagem explicativa usando -m', checked: false }
    ],
    validator: () => {
      return gitState.commits.length > 0;
    }
  },
  {
    id: 6,
    title: '6. Enviar ao GitHub (git push)',
    description: 'Seus commits foram salvos localmente. Agora é hora de compartilhá-los com o mundo enviando-os para o GitHub através do comando <span class="cmd-highlight">git push</span>.',
    tip: 'Digite <span class="cmd-highlight">git push origin main</span> (ou apenas <span class="cmd-highlight">git push</span>) para enviar seus commits locais para o servidor remoto.',
    objectives: [
      { id: 'git-push', text: 'Enviar os commits locais para o repositório remoto no GitHub', checked: false }
    ],
    validator: () => {
      return gitState.remote.commits.length > 0 && gitState.remote.commits.length === gitState.commits.length;
    }
  },
  {
    id: 7,
    title: '7. Puxar Atualizações (git pull)',
    description: 'Se outra pessoa fez commits diretamente no GitHub (ou você mesmo a partir de outro computador), seu repositório local ficará desatualizado. Para buscar essas alterações e mesclá-las automaticamente com o seu código, use o comando <span class="cmd-highlight">git pull</span>.',
    tip: 'Simulamos que um novo commit foi criado no GitHub! Digite <span class="cmd-highlight">git pull origin main</span> ou <span class="cmd-highlight">git pull</span> para atualizar seu repositório local.',
    objectives: [
      { id: 'git-pull', text: 'Atualizar seu repositório local com as novidades do GitHub', checked: false }
    ],
    validator: () => {
      // Satisfied if local commits match remote commits after remote commits increased
      return gitState.commits.length === gitState.remote.commits.length && gitState.remote.commits.length >= 2;
    }
  }
];

let currentLevelIndex = 0;
let sandboxMode = false;
let activeFile = 'index.html';

// --- DOM Elements ---
const elLevelSelect = document.getElementById('level-select');
const elTutTitle = document.getElementById('tut-title');
const elTutDescription = document.getElementById('tut-description');
const elTutTip = document.getElementById('tut-tip');
const elObjectivesList = document.getElementById('objectives-list');
const elBtnPrevLevel = document.getElementById('btn-prev-level');
const elBtnNextLevel = document.getElementById('btn-next-level');
const elLevelIndicator = document.getElementById('level-indicator');
const elGeneralProgressBar = document.getElementById('general-progress-bar');
const elProgressPercent = document.getElementById('progress-percent');

const elTabs = document.querySelectorAll('.tab');
const elFileTextarea = document.getElementById('file-textarea');
const elBtnSaveFile = document.getElementById('btn-save-file');
const elCurrentFilepath = document.getElementById('current-filepath');
const elFileStatusLbl = document.getElementById('file-status-lbl');

const elTerminalOutput = document.getElementById('terminal-output');
const elTerminalInput = document.getElementById('terminal-input');
const elTerminalPromptPrefix = document.getElementById('terminal-prompt-prefix');
const elBtnClearTerm = document.getElementById('btn-clear-term');

const elBadgeWorkingCount = document.getElementById('badge-working-count');
const elWorkingDirFiles = document.getElementById('working-dir-files');
const elBadgeStagingCount = document.getElementById('badge-staging-count');
const elStagingFiles = document.getElementById('staging-files');
const elBadgeCommitsCount = document.getElementById('badge-commits-count');
const elLocalCommitsTimeline = document.getElementById('local-commits-timeline');
const elLocalBranchName = document.getElementById('local-branch-name');

const elGithubRepoPath = document.getElementById('github-repo-path');
const elGithubConnStatus = document.getElementById('github-conn-status');
const elGithubConnLbl = document.getElementById('github-conn-lbl');
const elGithubCommitsCount = document.getElementById('github-commits-count');
const elGithubFilesList = document.getElementById('github-files-list');

const elBtnSandbox = document.getElementById('btn-sandbox');
const elBtnReset = document.getElementById('btn-reset');
const audioClick = document.getElementById('audio-click');

// --- Initialization ---
function init() {
  setupEventListeners();
  loadLevel(0);
  updateFileEditor();
  updateVisualizer();
  lucide.createIcons();
}

// --- Event Listeners ---
function setupEventListeners() {
  // Level Selector
  elLevelSelect.addEventListener('change', (e) => {
    loadLevel(parseInt(e.target.value) - 1);
  });

  elBtnPrevLevel.addEventListener('click', () => {
    if (currentLevelIndex > 0) loadLevel(currentLevelIndex - 1);
  });

  elBtnNextLevel.addEventListener('click', () => {
    if (currentLevelIndex < levels.length - 1) loadLevel(currentLevelIndex + 1);
  });

  // Sandbox Mode Toggle
  elBtnSandbox.addEventListener('click', () => {
    sandboxMode = !sandboxMode;
    elBtnSandbox.classList.toggle('active', sandboxMode);
    if (sandboxMode) {
      writeTerminalLine('Modo Livre (Sandbox) ATIVADO. Sinta-se à vontade para testar comandos Git!', 'info-msg');
    } else {
      writeTerminalLine('Modo Livre DESATIVADO. Volte para os objetivos do tutorial.', 'info-msg');
    }
    updateLevelUI();
  });

  // Reset Button
  elBtnReset.addEventListener('click', () => {
    if (confirm('Deseja realmente resetar o progresso do laboratório?')) {
      resetLab();
    }
  });

  // Tabs
  elTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      elTabs.forEach(t => t.classList.remove('active'));
      const clickedTab = e.currentTarget;
      clickedTab.classList.add('active');
      activeFile = clickedTab.dataset.file;
      updateFileEditor();
    });
  });

  // Save File Button
  elBtnSaveFile.addEventListener('click', () => {
    saveActiveFile();
  });

  // Terminal input submit
  elTerminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = elTerminalInput.value.trim();
      elTerminalInput.value = '';
      if (command) {
        handleTerminalCommand(command);
      }
    }
  });

  // Click terminal body focuses input
  document.querySelector('.terminal-panel').addEventListener('click', () => {
    elTerminalInput.focus();
  });

  // Clear Terminal Button
  elBtnClearTerm.addEventListener('click', () => {
    elTerminalOutput.innerHTML = '';
  });
}

// --- File Editor Management ---
function updateFileEditor() {
  elCurrentFilepath.textContent = activeFile;
  elFileTextarea.value = vfs[activeFile].content;
  
  // Update status badge
  if (vfs[activeFile].content !== vfs[activeFile].lastSavedContent) {
    elFileStatusLbl.textContent = 'Não Salvo / Modificado';
    elFileStatusLbl.className = 'file-status-badge status-modified';
  } else {
    elFileStatusLbl.textContent = 'Salvo / Sincronizado';
    elFileStatusLbl.className = 'file-status-badge status-saved';
  }
}

function saveActiveFile() {
  vfs[activeFile].content = elFileTextarea.value;
  vfs[activeFile].lastSavedContent = vfs[activeFile].content;
  updateFileEditor();
  playAudio();
  
  writeTerminalLine(`Arquivo /workspace/${activeFile} salvo com sucesso.`, 'success-msg');

  // Trigger modification in Working Directory if repository is initialized or cloned
  if (gitState.isInitialized || gitState.isCloned) {
    // If it's cloned or initialized, check if file was originally different from last commit
    let originallyContent = '';
    if (gitState.commits.length > 0) {
      const lastCommit = gitState.commits[gitState.commits.length - 1];
      originallyContent = lastCommit.files[activeFile] || '';
    }
    
    if (vfs[activeFile].content !== originallyContent) {
      gitState.workingDirectory[activeFile] = originallyContent === '' ? 'untracked' : 'modified';
    } else {
      delete gitState.workingDirectory[activeFile];
    }
  }

  // Tutorial objective triggers
  if (currentLevelIndex === 3) { // Level 4: Prepare changes (git add)
    levels[3].objectives[0].checked = true;
    updateLevelUI();
  }

  updateVisualizer();
}

// --- Terminal Emulator Logic ---
function writeTerminalLine(text, className = '') {
  const line = document.createElement('div');
  line.className = `terminal-line ${className}`;
  line.innerHTML = text;
  elTerminalOutput.appendChild(line);
  elTerminalOutput.scrollTop = elTerminalOutput.scrollHeight;
}

function handleTerminalCommand(rawCommand) {
  // Echo the command
  writeTerminalLine(`${elTerminalPromptPrefix.textContent} ${rawCommand}`, 'cmd-input-line');
  
  const tokens = parseCommand(rawCommand);
  if (tokens.length === 0) return;

  const baseCmd = tokens[0];

  switch (baseCmd) {
    case 'help':
      printHelp();
      break;
    case 'clear':
      elTerminalOutput.innerHTML = '';
      break;
    case 'ls':
      listVirtualFiles();
      break;
    case 'cat':
      catVirtualFile(tokens[1]);
      break;
    case 'git':
      handleGitCommand(tokens.slice(1));
      break;
    default:
      writeTerminalLine(`bash: command not found: ${baseCmd}. Digite <span class="cmd-highlight">help</span> para ajuda.`, 'error-msg');
  }
}

// Simple parser respecting quotes
function parseCommand(cmdStr) {
  const matches = cmdStr.match(/("[^"]+"|[^\s"]+)/g) || [];
  return matches.map(token => {
    if (token.startsWith('"') && token.endsWith('"')) {
      return token.slice(1, -1);
    }
    return token;
  });
}

function printHelp() {
  writeTerminalLine('Comandos do Sistema Disponíveis:', 'info-msg');
  writeTerminalLine('  ls                  - Lista arquivos no diretório de trabalho local');
  writeTerminalLine('  cat [arquivo]       - Exibe o conteúdo de um arquivo');
  writeTerminalLine('  clear               - Limpa a tela do terminal');
  writeTerminalLine('  help                - Exibe este menu de ajuda');
  writeTerminalLine('Comandos Git Disponíveis:', 'info-msg');
  writeTerminalLine('  git config --global user.name "[nome]"');
  writeTerminalLine('  git config --global user.email "[email]"');
  writeTerminalLine('  git init');
  writeTerminalLine('  git clone [url]');
  writeTerminalLine('  git add [arquivo] ou git add .');
  writeTerminalLine('  git commit -m "[mensagem]"');
  writeTerminalLine('  git push origin [branch]');
  writeTerminalLine('  git pull origin [branch]');
  writeTerminalLine('  git status');
  writeTerminalLine('  git log');
}

function listVirtualFiles() {
  writeTerminalLine('Arquivos na pasta local (/workspace):');
  Object.keys(vfs).forEach(file => {
    writeTerminalLine(`  ${file}`);
  });
}

function catVirtualFile(filename) {
  if (!filename) {
    writeTerminalLine('Uso: cat [nome_do_arquivo]', 'error-msg');
    return;
  }
  const file = vfs[filename.toLowerCase()];
  if (file) {
    writeTerminalLine(`--- Conteúdo de ${filename} ---`);
    writeTerminalLine(escapeHtml(file.content));
  } else {
    writeTerminalLine(`cat: ${filename}: Arquivo não encontrado`, 'error-msg');
  }
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --- Git Commands Simulation ---
function handleGitCommand(args) {
  if (args.length === 0) {
    writeTerminalLine('Uso do git. Digite <span class="cmd-highlight">help</span> para ver a lista de comandos.', 'error-msg');
    return;
  }

  const subCmd = args[0];

  // Config command can be run without initialization
  if (subCmd === 'config') {
    handleGitConfig(args.slice(1));
    return;
  }

  // Clone command can be run without initialization (in fact, it initializes git)
  if (subCmd === 'clone') {
    handleGitClone(args.slice(1));
    return;
  }

  // All other commands require git config to be defined first (except we allow sandbox shortcuts)
  if (!sandboxMode && currentLevelIndex > 0 && (gitState.config.username === '' || gitState.config.email === '')) {
    writeTerminalLine('Erro: Você precisa configurar o seu user.name e user.email antes de usar o Git.', 'error-msg');
    return;
  }

  // All other commands require initialization (either through init or clone)
  if (subCmd === 'init') {
    handleGitInit();
    return;
  }

  if (!gitState.isInitialized && !gitState.isCloned) {
    writeTerminalLine('fatal: not a git repository (or any of the parent directories): .git', 'error-msg');
    return;
  }

  switch (subCmd) {
    case 'add':
      handleGitAdd(args.slice(1));
      break;
    case 'commit':
      handleGitCommit(args.slice(1));
      break;
    case 'push':
      handleGitPush(args.slice(1));
      break;
    case 'pull':
      handleGitPull(args.slice(1));
      break;
    case 'status':
      handleGitStatus();
      break;
    case 'log':
      handleGitLog();
      break;
    default:
      writeTerminalLine(`git: '${subCmd}' não é um comando reconhecido. Digite <span class="cmd-highlight">help</span>.`, 'error-msg');
  }
}

function handleGitConfig(args) {
  // Expecting --global user.name "..." or --global user.email "..."
  if (args[0] !== '--global') {
    writeTerminalLine('Erro: use a flag <span class="cmd-highlight">--global</span> para as configurações deste laboratório.', 'error-msg');
    return;
  }

  const key = args[1];
  const value = args[2];

  if (!key || !value) {
    writeTerminalLine('Uso: git config --global user.name "Seu Nome" ou git config --global user.email "seuemail@exemplo.com"', 'error-msg');
    return;
  }

  if (key === 'user.name') {
    gitState.config.username = value;
    writeTerminalLine(`Configuração salva: user.name definido para "${value}"`, 'success-msg');
    
    // Check level objectives
    if (currentLevelIndex === 0) {
      levels[0].objectives[0].checked = true;
      updateLevelUI();
    }
  } else if (key === 'user.email') {
    gitState.config.email = value;
    writeTerminalLine(`Configuração salva: user.email definido para "${value}"`, 'success-msg');

    // Check level objectives
    if (currentLevelIndex === 0) {
      levels[0].objectives[1].checked = true;
      updateLevelUI();
    }
  } else {
    writeTerminalLine(`Chave de configuração "${key}" não suportada neste simulador.`, 'error-msg');
  }
  
  updateTerminalPrompt();
}

function handleGitInit() {
  if (gitState.isInitialized || gitState.isCloned) {
    writeTerminalLine('Reinitialized existing Git repository in /workspace/.git/', 'info-msg');
    return;
  }

  gitState.isInitialized = true;
  gitState.branch = 'main';
  writeTerminalLine('Initialized empty Git repository in /workspace/.git/', 'success-msg');
  
  // Set files as Untracked in Working Directory since we just initialized Git
  Object.keys(vfs).forEach(file => {
    gitState.workingDirectory[file] = 'untracked';
  });

  if (currentLevelIndex === 1) {
    levels[1].objectives[0].checked = true;
    updateLevelUI();
  }

  updateTerminalPrompt();
  updateVisualizer();
}

function handleGitClone(args) {
  const url = args[0];
  if (!url) {
    writeTerminalLine('fatal: You must specify a repository to clone.', 'error-msg');
    return;
  }

  const expectedUrl = 'https://github.com/luisflv/project-repo.git';
  if (url !== expectedUrl) {
    writeTerminalLine(`fatal: Repository '${url}' not found. Dica: use a URL do projeto do GitHub informada nas instruções.`, 'error-msg');
    return;
  }

  if (gitState.isCloned || gitState.isInitialized) {
    writeTerminalLine('fatal: destination path already exists and is not an empty directory.', 'error-msg');
    return;
  }

  writeTerminalLine(`Cloning into 'project-repo'...`);
  writeTerminalLine(`remote: Enumerating objects: 3, done.`);
  writeTerminalLine(`remote: Counting objects: 100% (3/3), done.`);
  writeTerminalLine(`remote: Total 3 (delta 0), reused 3 (delta 0), pack-reused 0`);
  writeTerminalLine(`Receiving objects: 100% (3/3), done.`);

  gitState.isCloned = true;
  gitState.isInitialized = true; // cloning creates a local git repo
  gitState.clonedFromUrl = url;
  gitState.remoteUrl = 'origin';
  gitState.branch = 'main';
  
  // Setup simulated remote configuration
  gitState.remote.connected = true;
  
  // Download initial remote files (if any)
  gitState.commits = [
    {
      hash: 'a1b2c3d',
      message: 'Initial remote commit',
      author: 'GitHub Developer <dev@github.com>',
      date: new Date().toLocaleString(),
      files: {
        'index.html': vfs['index.html'].content,
        'readme.md': vfs['readme.md'].content
      }
    }
  ];

  gitState.remote.commits = [...gitState.commits];
  gitState.remote.files = {
    'index.html': vfs['index.html'].content,
    'readme.md': vfs['readme.md'].content
  };

  // Clean working directory because it matches remote clone
  gitState.workingDirectory = {};
  gitState.stagingArea = {};

  writeTerminalLine(`Clonagem concluída com sucesso! Pasta 'project-repo' sincronizada.`, 'success-msg');

  if (currentLevelIndex === 2) {
    levels[2].objectives[0].checked = true;
    updateLevelUI();
  }

  updateTerminalPrompt();
  updateVisualizer();
}

function handleGitAdd(args) {
  const target = args[0];
  if (!target) {
    writeTerminalLine('Nothing specified, nothing added.', 'error-msg');
    return;
  }

  if (target === '.' || target === '*') {
    // Add all modified/untracked files to staging
    const addedFiles = [];
    Object.keys(gitState.workingDirectory).forEach(file => {
      gitState.stagingArea[file] = vfs[file].content;
      delete gitState.workingDirectory[file];
      addedFiles.push(file);
    });

    if (addedFiles.length > 0) {
      writeTerminalLine(`Adicionado ao staging: ${addedFiles.join(', ')}`, 'success-msg');
    } else {
      writeTerminalLine('Nenhuma alteração pendente para adicionar.', 'info-msg');
    }
  } else {
    // Add specific file
    const file = target.toLowerCase();
    if (!vfs[file]) {
      writeTerminalLine(`fatal: pathspec '${target}' did not match any files`, 'error-msg');
      return;
    }

    if (gitState.workingDirectory[file]) {
      gitState.stagingArea[file] = vfs[file].content;
      delete gitState.workingDirectory[file];
      writeTerminalLine(`Adicionado ao staging: ${file}`, 'success-msg');
    } else {
      writeTerminalLine(`O arquivo '${file}' não possui alterações para adicionar.`, 'info-msg');
    }
  }

  // Validate objective for level 4
  if (currentLevelIndex === 3) {
    levels[3].objectives[1].checked = true;
    updateLevelUI();
  }

  updateVisualizer();
}

function handleGitCommit(args) {
  // Look for message flag -m
  let msg = '';
  const mIndex = args.indexOf('-m');
  if (mIndex !== -1 && args[mIndex + 1]) {
    msg = args[mIndex + 1];
  }

  if (Object.keys(gitState.stagingArea).length === 0) {
    writeTerminalLine('nothing to commit, working tree clean', 'info-msg');
    return;
  }

  if (!msg) {
    writeTerminalLine('Erro: Para commitar alterações, você deve fornecer uma mensagem usando a flag -m. Exemplo: <span class="cmd-highlight">git commit -m "Mensagem"</span>', 'error-msg');
    return;
  }

  // Generate random hash
  const hash = Math.random().toString(16).substring(2, 9);
  
  // Captures the state of staged files
  const commitFiles = {};
  // Start with previous commit state files
  if (gitState.commits.length > 0) {
    Object.assign(commitFiles, gitState.commits[gitState.commits.length - 1].files);
  }
  // Apply changes from staging area
  Object.keys(gitState.stagingArea).forEach(file => {
    commitFiles[file] = gitState.stagingArea[file];
  });

  const author = `${gitState.config.username || 'Desconhecido'} <${gitState.config.email || 'email@exemplo.com'}>`;
  
  const newCommit = {
    hash,
    message: msg,
    author,
    date: new Date().toLocaleTimeString(),
    files: commitFiles
  };

  gitState.commits.push(newCommit);
  const affectedCount = Object.keys(gitState.stagingArea).length;
  gitState.stagingArea = {}; // Clear staging

  writeTerminalLine(`[main ${hash}] ${msg}`, 'success-msg');
  writeTerminalLine(` ${affectedCount} file(s) changed. Commit registrado localmente.`, 'success-msg');

  // Validate level 5
  if (currentLevelIndex === 4) {
    levels[4].objectives[0].checked = true;
    updateLevelUI();
  }

  updateVisualizer();
}

function handleGitPush(args) {
  // Optional target remote & branch (origin main)
  const remoteArg = args[0] || 'origin';
  const branchArg = args[1] || 'main';

  if (!gitState.isCloned && !gitState.remoteUrl) {
    writeTerminalLine('fatal: No configured push destination. You might need to configure a remote or have cloned a repo first.', 'error-msg');
    return;
  }

  if (gitState.commits.length === 0) {
    writeTerminalLine('Everything up-to-date (Nenhum commit local para enviar).', 'info-msg');
    return;
  }

  writeTerminalLine(`Enviando para o repositório remoto no GitHub...`);
  writeTerminalLine(`Compressing objects: 100% (2/2), done.`);
  writeTerminalLine(`Writing objects: 100% (3/3), 250 bytes | 250.00 KiB/s, done.`);
  
  // Sync to remote repo mock
  gitState.remote.commits = [...gitState.commits];
  // Sync remote files with last commit
  const lastCommit = gitState.commits[gitState.commits.length - 1];
  gitState.remote.files = Object.assign({}, lastCommit.files);

  writeTerminalLine(`To https://github.com/luisflv/project-repo.git`);
  writeTerminalLine(` * [new branch]      main -> main`);
  writeTerminalLine(`Enviado com sucesso! Seus commits agora estão visíveis no GitHub.`, 'success-msg');

  // Validate level 6
  if (currentLevelIndex === 5) {
    levels[5].objectives[0].checked = true;
    updateLevelUI();
  }

  updateVisualizer();
}

function handleGitPull(args) {
  if (!gitState.isCloned && !gitState.remoteUrl) {
    writeTerminalLine('fatal: No remote repository configured to pull from.', 'error-msg');
    return;
  }

  writeTerminalLine(`Buscando atualizações de origin/main...`);
  
  // Check if remote has commits that local doesn't have
  if (gitState.remote.commits.length > gitState.commits.length) {
    // Bring commits from remote
    gitState.commits = [...gitState.remote.commits];
    // Sync local filesystem with remote files
    Object.keys(gitState.remote.files).forEach(file => {
      vfs[file].content = gitState.remote.files[file];
      vfs[file].lastSavedContent = gitState.remote.files[file];
    });

    writeTerminalLine(`Updating ${gitState.commits[gitState.commits.length - 2].hash}..${gitState.commits[gitState.commits.length - 1].hash}`);
    writeTerminalLine(`Fast-forward`);
    writeTerminalLine(` index.html | 2 +-`);
    writeTerminalLine(` 1 file changed, 1 insertion(+), 1 deletion(-)`);
    writeTerminalLine(`Local atualizado com sucesso com as modificações do GitHub!`, 'success-msg');
    
    // Update active editor file with the new content
    updateFileEditor();

    if (currentLevelIndex === 6) {
      levels[6].objectives[0].checked = true;
      updateLevelUI();
    }
  } else {
    writeTerminalLine('Already up-to-date (Seu repositório local já está sincronizado).', 'info-msg');
  }

  updateVisualizer();
}

function handleGitStatus() {
  writeTerminalLine(`No branch ${gitState.branch}`);
  
  const untracked = [];
  const modified = [];
  
  Object.keys(gitState.workingDirectory).forEach(file => {
    if (gitState.workingDirectory[file] === 'untracked') untracked.push(file);
    else modified.push(file);
  });

  const staged = Object.keys(gitState.stagingArea);

  if (staged.length > 0) {
    writeTerminalLine('Alterações prontas para commit (Staging):', 'success-msg');
    staged.forEach(file => {
      writeTerminalLine(`  staged:   ${file}`, 'success-msg');
    });
  }

  if (modified.length > 0) {
    writeTerminalLine('Arquivos modificados no diretório de trabalho:', 'warning-msg');
    modified.forEach(file => {
      writeTerminalLine(`  modificado: ${file}`, 'warning-msg');
    });
  }

  if (untracked.length > 0) {
    writeTerminalLine('Arquivos não rastreados (use "git add <arquivo>..." para incluí-los):', 'error-msg');
    untracked.forEach(file => {
      writeTerminalLine(`  untracked:  ${file}`, 'error-msg');
    });
  }

  if (staged.length === 0 && modified.length === 0 && untracked.length === 0) {
    writeTerminalLine('nothing to commit, working tree clean', 'info-msg');
  }
}

function handleGitLog() {
  if (gitState.commits.length === 0) {
    writeTerminalLine('fatal: your current branch does not have any commits yet.', 'error-msg');
    return;
  }

  writeTerminalLine('Histórico de Commits:', 'info-msg');
  // Print commits descending (newest first)
  for (let i = gitState.commits.length - 1; i >= 0; i--) {
    const c = gitState.commits[i];
    writeTerminalLine(`commit ${c.hash}`, 'secondary');
    writeTerminalLine(`Author: ${c.author}`);
    writeTerminalLine(`Date:   ${c.date}`);
    writeTerminalLine(`\n    ${c.message}\n`, 'text-main');
  }
}

function updateTerminalPrompt() {
  let prefix = 'user@git-lab:~$';
  if (gitState.isInitialized || gitState.isCloned) {
    prefix = `user@git-lab:~/workspace (${gitState.branch})`;
  }
  elTerminalPromptPrefix.textContent = prefix;
}

// --- Tutorial Management ---
function loadLevel(index) {
  if (index < 0 || index >= levels.length) return;
  currentLevelIndex = index;
  
  const level = levels[currentLevelIndex];
  
  elLevelSelect.value = (currentLevelIndex + 1).toString();
  elTutTitle.textContent = level.title;
  elTutDescription.innerHTML = level.description;
  elTutTip.innerHTML = level.tip;
  elLevelIndicator.textContent = `Nível ${currentLevelIndex + 1} de ${levels.length}`;

  // Build objectives
  elObjectivesList.innerHTML = '';
  level.objectives.forEach(obj => {
    const li = document.createElement('li');
    li.id = `obj-item-${obj.id}`;
    if (obj.checked) li.className = 'completed';
    
    li.innerHTML = `
      <i data-lucide="${obj.checked ? 'check-square' : 'square'}" class="obj-checkbox"></i>
      <span class="obj-text">${obj.text}</span>
    `;
    elObjectivesList.appendChild(li);
  });

  // Enable/disable navigation buttons
  elBtnPrevLevel.disabled = currentLevelIndex === 0;
  elBtnNextLevel.disabled = true; // Will enable if level validator passes

  // Specific Level Simulations Triggers
  if (currentLevelIndex === 6) { // Level 7: Git pull
    // Simulate remote commit creation on GitHub
    simulateGitHubNewCommit();
  }

  checkLevelCompletion();
  lucide.createIcons();
  playAudio();
}

function checkLevelCompletion() {
  if (sandboxMode) return;

  const level = levels[currentLevelIndex];
  const allObjectivesChecked = level.objectives.every(obj => obj.checked);
  const validatorPassed = level.validator();

  if (allObjectivesChecked && validatorPassed) {
    elBtnNextLevel.disabled = currentLevelIndex === levels.length - 1;
    writeTerminalLine(`Nível ${currentLevelIndex + 1} Concluído! Parabéns!`, 'success-msg');
    
    // Animate progress bar
    updateProgressBar();
  }
}

function updateLevelUI() {
  const level = levels[currentLevelIndex];
  level.objectives.forEach(obj => {
    const li = document.getElementById(`obj-item-${obj.id}`);
    if (li) {
      const isCheckedNow = obj.checked;
      li.className = isCheckedNow ? 'completed' : '';
      const icon = li.querySelector('.obj-checkbox');
      if (icon) {
        icon.setAttribute('data-lucide', isCheckedNow ? 'check-square' : 'square');
      }
    }
  });

  lucide.createIcons();
  checkLevelCompletion();
}

function updateProgressBar() {
  // Count how many levels passed
  let completedCount = 0;
  levels.forEach((l, idx) => {
    const passed = l.objectives.every(o => o.checked) && l.validator();
    if (passed) completedCount++;
  });

  const percentage = Math.round((completedCount / levels.length) * 100);
  elGeneralProgressBar.style.width = `${percentage}%`;
  elProgressPercent.textContent = `${percentage}%`;
}

function simulateGitHubNewCommit() {
  // If GitHub simulation has not been updated with a level 7 extra commit, add one.
  if (gitState.remote.commits.length <= gitState.commits.length && gitState.commits.length > 0) {
    writeTerminalLine('\n[Notificação do GitHub]: Um colaborador fez um push de alterações no repositório remoto!', 'info-msg');
    writeTerminalLine('Um novo arquivo ou linha de código foi editado no GitHub diretamente.', 'info-msg');
    writeTerminalLine('Use o comando <span class="cmd-highlight">git pull</span> para sincronizar seu repositório local.', 'info-msg');

    const lastCommit = gitState.commits[gitState.commits.length - 1];
    
    // Simulate remote commit containing modifications on readme.md
    const newRemoteFiles = Object.assign({}, lastCommit.files);
    newRemoteFiles['readme.md'] = `# Git & GitHub Project\n\nEste é um repositório simulado para o laboratório de Git e GitHub.\n\n* ATUALIZAÇÃO REMOTA: Adicionado no GitHub de outro computador! *`;

    const extraCommit = {
      hash: '3e4f5g6',
      message: 'Update readme.md with remote guidelines',
      author: 'Collaborator <collab@github.com>',
      date: new Date().toLocaleTimeString(),
      files: newRemoteFiles
    };

    gitState.remote.commits = [...gitState.commits, extraCommit];
    gitState.remote.files = newRemoteFiles;

    updateVisualizer();
  }
}

// --- Visualizer Renderer Engine ---
function updateVisualizer() {
  // Col 1: Working Directory View
  const workingFilesDiv = elWorkingDirFiles;
  workingFilesDiv.innerHTML = '';
  
  const wdFilesList = Object.keys(gitState.workingDirectory);
  elBadgeWorkingCount.textContent = wdFilesList.length;

  if (wdFilesList.length === 0) {
    workingFilesDiv.innerHTML = '<p class="empty-placeholder">Nenhum arquivo modificado</p>';
  } else {
    wdFilesList.forEach(file => {
      const type = gitState.workingDirectory[file]; // 'untracked' or 'modified'
      const card = document.createElement('div');
      card.className = `file-card ${type}`;
      card.innerHTML = `
        <div class="file-card-info">
          <i data-lucide="${file.endsWith('.html') ? 'file-code' : 'file-text'}"></i>
          <span class="file-card-name">${file}</span>
        </div>
        <span class="file-card-status">${type === 'untracked' ? 'untracked' : 'modificado'}</span>
      `;
      workingFilesDiv.appendChild(card);
    });
  }

  // Col 2: Staging Area View
  const stagingFilesDiv = elStagingFiles;
  stagingFilesDiv.innerHTML = '';
  
  const stageFilesList = Object.keys(gitState.stagingArea);
  elBadgeStagingCount.textContent = stageFilesList.length;

  if (stageFilesList.length === 0) {
    stagingFilesDiv.innerHTML = '<p class="empty-placeholder">Nenhum arquivo na staging area</p>';
  } else {
    stageFilesList.forEach(file => {
      const card = document.createElement('div');
      card.className = 'file-card staged';
      card.innerHTML = `
        <div class="file-card-info">
          <i data-lucide="${file.endsWith('.html') ? 'file-code' : 'file-text'}"></i>
          <span class="file-card-name">${file}</span>
        </div>
        <span class="file-card-status">staged</span>
      `;
      stagingFilesDiv.appendChild(card);
    });
  }

  // Col 3: Local Repository Commits Timeline
  const localCommitsDiv = elLocalCommitsTimeline;
  localCommitsDiv.innerHTML = '';
  elBadgeCommitsCount.textContent = gitState.commits.length;
  elLocalBranchName.textContent = gitState.branch;

  if (!gitState.isInitialized && !gitState.isCloned) {
    localCommitsDiv.innerHTML = '<p class="empty-placeholder">Repositório não inicializado. Digite <span class="cmd-highlight">git init</span> para começar.</p>';
  } else if (gitState.commits.length === 0) {
    localCommitsDiv.innerHTML = '<p class="empty-placeholder">Nenhum commit local efetuado. Crie alterações e digite <span class="cmd-highlight">git commit -m "mensagem"</span>.</p>';
  } else {
    gitState.commits.forEach(commit => {
      const node = document.createElement('div');
      node.className = 'commit-node';
      node.innerHTML = `
        <div class="commit-header">
          <span class="commit-hash">#${commit.hash}</span>
          <span class="commit-author">${commit.author.split(' ')[0]}</span>
        </div>
        <span class="commit-msg">${commit.message}</span>
      `;
      localCommitsDiv.appendChild(node);
    });
  }

  // Col 4: GitHub Remote Interface Mock
  const gitHubFilesDiv = elGithubFilesList;
  gitHubFilesDiv.innerHTML = '';

  if (gitState.isCloned || gitState.remoteUrl || gitState.remote.connected) {
    elGithubConnStatus.className = 'status-dot connected';
    elGithubConnLbl.textContent = 'Conectado';
    elGithubCommitsCount.textContent = gitState.remote.commits.length;
    
    const remoteFilesList = Object.keys(gitState.remote.files);
    
    if (remoteFilesList.length === 0) {
      gitHubFilesDiv.innerHTML = '<p class="empty-placeholder">Repositório remoto vazio.</p>';
    } else {
      remoteFilesList.forEach(file => {
        const row = document.createElement('div');
        row.className = 'github-file-row';
        
        // Find last commit affecting this file on remote
        let lastCommitMsg = 'initial';
        for (let i = gitState.remote.commits.length - 1; i >= 0; i--) {
          const c = gitState.remote.commits[i];
          if (c.files[file]) {
            lastCommitMsg = c.message;
            break;
          }
        }
        
        row.innerHTML = `
          <div class="github-file-name">
            <i data-lucide="${file.endsWith('.html') ? 'file-code' : 'file-text'}"></i>
            <span>${file}</span>
          </div>
          <span class="github-file-commit">${lastCommitMsg}</span>
        `;
        gitHubFilesDiv.appendChild(row);
      });
    }
  } else {
    elGithubConnStatus.className = 'status-dot disconnected';
    elGithubConnLbl.textContent = 'Desconectado';
    elGithubCommitsCount.textContent = '0';
    gitHubFilesDiv.innerHTML = '<p class="empty-placeholder">Repositório remoto não conectado. Faça <span class="cmd-highlight">git clone</span>.</p>';
  }

  lucide.createIcons();
}

// --- Audio Feedback Mocks ---
function playAudio() {
  try {
    audioClick.currentTime = 0;
    audioClick.play().catch(() => {});
  } catch (e) {}
}

// --- Reset / Reload Functions ---
function resetLab() {
  // Clear states
  vfs['index.html'].content = `<!DOCTYPE html>\n<html>\n<head>\n  <title>Meu Web App</title>\n</head>\n<body>\n  <h1>Olá Mundo!</h1>\n</body>\n</html>`;
  vfs['index.html'].lastSavedContent = vfs['index.html'].content;
  vfs['readme.md'].content = `# Git & GitHub Project\n\nEste é um repositório simulado para o laboratório de Git e GitHub.`;
  vfs['readme.md'].lastSavedContent = vfs['readme.md'].content;

  gitState = {
    config: { username: '', email: '' },
    isInitialized: false,
    isCloned: false,
    clonedFromUrl: '',
    remoteUrl: '',
    branch: 'main',
    workingDirectory: {},
    stagingArea: {},
    commits: [],
    remote: {
      connected: false,
      repoName: 'luisflv/project-repo',
      commits: [],
      files: {}
    }
  };

  levels.forEach(lvl => {
    lvl.objectives.forEach(obj => obj.checked = false);
  });

  currentLevelIndex = 0;
  sandboxMode = false;
  elBtnSandbox.classList.remove('active');

  // Terminal reset
  elTerminalOutput.innerHTML = `<div class="terminal-line system-msg">Laboratório reiniciado. Bem-vindo! Digite <span class="cmd-highlight">help</span> para ajuda.</div>`;
  
  loadLevel(0);
  updateFileEditor();
  updateTerminalPrompt();
  updateVisualizer();
  updateProgressBar();
}

// Run Startup
init();
