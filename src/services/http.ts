import { toasterCustom } from "../components/toaster/toaster";
import { Alert } from "../lang/thai";

const DEV_DOMAIN = 'http://localhost:5001/loan-planning-app/us-central1/app';
const PRODUCTION_DOMAIN = 'https://us-central1-loan-planning-app.cloudfunctions.net/app';

export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

interface Options extends RequestInit {
    disableToaster?: boolean
}

export async function FetchData(path: string, options?: Options): Promise<any> {
    let domain = '';
    const requestOptions: RequestInit  = {
        headers: { 'Content-Type': 'application/json' },
        method: options?.method ? options.method : HTTPMethod.GET,
    };
    if (options?.method === HTTPMethod.POST || options?.method === HTTPMethod.PUT) {
        requestOptions.body = options?.body || null;
    }

    if (process.env.NODE_ENV === 'development') {
        domain = DEV_DOMAIN;
    } else {
        domain = PRODUCTION_DOMAIN;
    }
    try {
        const res = await fetch(domain + path, requestOptions);
        if (!res.ok) {
            !options?.disableToaster && toasterCustom.danger(Alert.HTTP_ERROR);
            return Promise.reject('Something went wrong from http');
        }
        !options?.disableToaster && toasterCustom.success(Alert.HTTP_SUCCESS)
        return res.json();
    }
    catch(err) {
        !options?.disableToaster && toasterCustom.danger(Alert.HTTP_ERROR);
        return Promise.reject(err);
    }
}