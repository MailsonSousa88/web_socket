// A resposta do servidor abrangendo os seguintes campos (RESULT, STATUS, MESSAGE)

export class ResponseSerializer {

    // Resposta no caso de sucesso
    public sucess(result:number): string {
        return [
        `RESULT: ${result}`,
        `STATUS: OK`,
        `MESSAGE: Operação concluída com sucesso!`
        ].join("\n");
    }

    // Resposta no caso de erro
    public error(message:string): string {
        return [
        `STATUS: ERROR`,
        `MESSAGE: ${message}`
        ].join("\n");
    }

}