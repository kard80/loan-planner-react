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