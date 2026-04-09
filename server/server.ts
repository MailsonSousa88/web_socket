import http, { ServerResponse } from 'http'
import { WebSocketServer, WebSocket } from 'ws';

import { RequestParser } from "./protocol/requestParser";
import { Calculator } from "./protocol/calculator";
import { ResponseSerializer } from "./protocol/responseSerializer";

const parser = new RequestParser();
const calculator = new Calculator();
const serializer = new ResponseSerializer();

// Criando o servidor 
const httpOblivionServer = http.createServer((req: http.IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is runing');
});

// Novo server por pessoa/usuario
const wss: WebSocketServer = new WebSocketServer({ server: httpOblivionServer });

// Quando o usuario se conectar ao servidor
wss.on('connection', (ws: WebSocket) => {
    console.log('Você está conectado ao servidor OBLIVION by @MailsonSousa88');

    ws.on('message', (data) => {
        const msg = data.toString().trim();
        if(msg == "") {
            ws.close();
            console.log('Cliente desconectado do servidor...');
            return
        }

        try {
            // Primeiro passo: utilizando nosso parser
            const request = parser.parser(msg);

            // Segundo passo: utilizando calculadora em REDE para relaizar as operacoes
            const result = calculator.calculate(request.operation, request.operand1, request.operand2);

            // Terceira passo: utilizando o serializer para devolver a resposta no caso de SUCESSO
            const responseSucess = serializer.sucess(result);
            ws.send(responseSucess);

        } catch (error: any) {
            // IMPORTANTE: no caso de erro devolvemos eles atraves do CACH
            const errorMessage = error.message || "Erro interno do servidor.";
            const responseError = serializer.error(errorMessage)
            ws.send(responseError);
        }
    });
});

const PORT: number = 7001;
httpOblivionServer.listen(PORT, () => console.log(`Servidor Oblivion WebSocket ouvindo na porta ${PORT}`));