// Calculadora em REDE 

import { Operation } from "../types/operations";

export class Calculator {
    public calculate(operation:Operation, operand1:number, operand2:number): number {
        switch(operation) {
            case 'ADD':
                return operand1 + operand2;
            
            case 'SUB':
                return operand1 - operand2;

            case 'MUL':
                return operand1 * operand2;
            
            case 'DIV':
                // Nao e possivel dividir numeros por 0
                if(operand2 == 0) {
                    throw new Error("ERRO: Não é póssivel dividir números por 0.");
                }
                return operand1 / operand2
            default:
                throw new Error("ERRO: não foi possivel executar está operacâo.")
        }
    }   
}