import { ServicePayload, ServiceRequest } from '../types/serviceRequest';

export const Services: ServiceRequest[] = [
    {
        id: 'maximum-loan',
        label: 'วงเงินกู้สูงสุด',
        input: [
            {
                label: 'เงินเดือน',
                key: 'salary',
                type: 'number',
                value: 0

            }
        ],
        output: [
            {
                label: 'เงินกู้สูงสุด',
                key: 'loanAmount',
                type: 'number',
                value: 0
            }
        ],
    },
    // {
    //     id: 'pay-monthly',
    //     label: 'ผ่อนเดือนละ',
    //     input: [
    //         {
    //             label: 'เงินเดือน',
    //             key: 'salary',
    //             type: 'number',
    //             value: 0

    //         }
    //     ],
    //     output: [
    //         {
    //             label: 'เงินกู้สูงสุด',
    //             key: 'loanAmount',
    //             type: 'number',
    //             value: 0
    //         }
    //     ],
    //     options: ['disable']
    // }
]

export function FindService(id: string): ServiceRequest {
    let result: ServiceRequest = {
        id: '',
        label: '',
        input: [],
        output: []
    };
    
    Services.forEach(item => {
        if (item.id === id) {
            result = item;
            return;
        }
    })
    return result
}

export function MockNumberResult(payload: ServicePayload[]): ServicePayload[] {
    return payload.map(item => {
        return {...item, value: Math.random() * 1000000}
    })
}