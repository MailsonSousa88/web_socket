// Conversor de texto, vamos criar um parser para validar o formato da mensagem vinda do socket

import { Operation } from "../types/operations";

export class RequestParser {

    public parser(text:string): {operation:Operation, operand1:number, operand2:number} {
        // Primeiro passo: normalizar o texto removendo os espacos desnecessarios vindo da mensagem.
        // Segundo passo: transformar esse texto em um array com quebras de linha para OPEARTION | OPERAND1 | OPERAND2
        const normalizedText = text.trim();
        const textLines = normalizedText.split(/\r?\n/); 

        // Terceiro passo: criar um objeto temporario para facilitar a validacao dos items (Podem nao estar de acordo com o formato 'NUMBER')
        const data: {[format:string]: string} = {}

        // Quarto passo: percorrer o array do texto
        for (let textLine of textLines) {
            const parts = textLine.split(':');
            const key = parts[0].trim();            
            // Validacaoes necessarias: Formato da mensagem errado, sem ':' --> OPERATION ':' ADD
            if(parts.length != 2) {
                throw new Error("Utilize o formato correto para cada item da mensagem, exemplo:\nOPERATION: ADD\nOPERAND1: 2\nOPERAND2: 1")
            }
            const value = parts[1].trim();
            data[key] = value;
        }

        // Validacoes necessarias: registros das campos obrigatorios da MENSAGEM (OPERATION, OPERAND1, OPERAND2)
        if(data['OPERATION'] == undefined) {
            throw new Error("ERRO: OPERATION não foi registrado corretamente na mensagem.");
        }

        if(data['OPERAND1'] == undefined) {
            throw new Error("ERRO: OPERAND1 não foi registrado corretamente na mensagem.");
        }

        if(data['OPERAND2'] == undefined) {
            throw new Error("ERRO: OPERAND2 não foi registrado corretamente na mensagem.");
        }

        //Validacoes necessarias: tipo de OPERACAO no formato incorreto
        const op = data['OPERATION'];
        if(
            op != 'ADD' &&
            op != 'SUB' &&
            op != 'MUL' &&
            op != 'DIV'
        ) {
            throw new Error("ERRO: Tipo de operação está inválido.")
        }

        // Agora vamos extrair os valores numericos dos OPERANDS
        const operand1 = Number(data['OPERAND1']);
        const operand2 = Number(data['OPERAND2']);

        // Validacoes necessarias: O valor nao e um numero ou nao foi preechido corretamente
        if(isNaN(operand1) || isNaN(operand2)) {
            throw new Error('ERRO: Os valores não foram fornecidos de acordo com o padrão sugerido.')
        }

        return {
            operation: op,
            operand1,
            operand2
        }
    }
}