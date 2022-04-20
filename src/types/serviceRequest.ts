export type ServiceRequest = {
    id: string,
    label: string,
    input: ParameterInput[],
    output: ParameterOutput[],
    options: string[]
}

export type Parameter = {
    label: string,
    key: string,
    options?: ParameterOptions,
}

export enum ParameterType {
    String = 'string',
    Number = 'number'
}

export interface ParameterInput extends Parameter {
    type: ParameterType,
    required: boolean,
    value: string | number
}

export interface ParameterOutput extends Parameter {
    value?: string
}

export interface ParameterOptions {
    min?: number,
    step?: number
}

export type PlannerResponse = {
    months: MonthDetail[],
}

export type MonthDetail = {
    no: string,
    carryLoanAmount: string,
    interestRate: string,
    interestAmount: string,
    installment: string,
    principleDistract: string,
    remainingLoanAmount: string
}
