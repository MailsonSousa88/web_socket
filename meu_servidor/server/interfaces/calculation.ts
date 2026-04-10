// Formato da mensagem enviada pelo usuario
import { Operation } from "../types/operations"

export interface CalculationRequest {
    operation: Operation;
    operand1: number;
    operand2: number;
}