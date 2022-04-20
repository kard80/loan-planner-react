import { SessionStorageKey } from '../constant/constant';
import { ServiceRequest } from '../types/serviceRequest';

export const getJSONFromStorage = (id: string): ServiceRequest => {
    const sessionData = sessionStorage.getItem(SessionStorageKey);
    let result = {} as ServiceRequest;
    if (!sessionData) {
        return result;
    }
    const payload: ServiceRequest[] = JSON.parse(sessionData);
    payload.some(items => {
        let isDone = false;
        if (items.id === id) {
            result = items;
            isDone = true;
        }
        return isDone
    })
    return result;
}