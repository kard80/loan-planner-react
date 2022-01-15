export type ServiceRequest = {
    id: string,
    label: string,
    input: ServicePayload[],
    output: ServicePayload[],
    options: string[]
}

export type ServicePayload = {
    label: string,
    key: string,
    type: string,
    value: any
}

export type PlannerRequest = {
    loanAmount: string,
    interestRate: string,
    installment: string
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