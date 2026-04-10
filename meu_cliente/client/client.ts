const socket: WebSocket = new WebSocket('ws://localhost:7001');

const form = document.getElementById('calculator-form') as HTMLFormElement | null;
const logListElement = document.getElementById('log-list') as HTMLDivElement | null;

if (!form || !logListElement) {
  throw new Error('Elementos principais da interface nao foram encontrados.');
}

const logList: HTMLDivElement = logListElement;

type LogType = 'system' | 'client' | 'server';
const validOperations = ['ADD', 'SUB', 'MUL', 'DIV'] as const;

function addLog(message: string, type: LogType): void {
  const item = document.createElement('div');
  item.className = `log-item ${type}`;
  item.textContent = message;
  logList.appendChild(item);
  logList.scrollTop = logList.scrollHeight;
}

socket.onopen = () => {
  addLog('Conectado ao servidor WebSocket.', 'system');
};

socket.onmessage = (event: MessageEvent) => {
  addLog(`Servidor: ${String(event.data)}`, 'server');
};

socket.onclose = () => {
  addLog('Conexao encerrada.', 'system');
};

socket.onerror = () => {
  addLog('Erro ao comunicar com o servidor.', 'system');
};

form.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault();

  const formData = new FormData(form);
  const op = String(formData.get('operation') ?? '').trim();
  const num1 = String(formData.get('operand1') ?? '');
  const num2 = String(formData.get('operand2') ?? '');

  // if (!validOperations.includes(op as (typeof validOperations)[number])) {
  //  addLog('Operacao invalida. Use ADD, SUB, MUL ou DIV.', 'system');
  //  return;
  // }

  const message = [
    `OPERATION: ${op}`,
    `OPERAND1: ${num1}`,
    `OPERAND2: ${num2}`
  ].join('\n');

  if (socket.readyState !== WebSocket.OPEN) {
    addLog('O socket ainda nao esta conectado.', 'system');
    return;
  }

  socket.send(message);
  addLog(`Cliente:\n${message}`, 'client');
  form.reset();
});
