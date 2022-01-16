import { toasterCustom } from "../components/toaster/toaster";
import { Alert } from "../lang/thai";

export async function FetchData(path: string): Promise<any> {
    let domain = '';
    if (process.env.NODE_ENV === 'development') {
        domain = 'http://localhost:5001/loan-planning-app/us-central1/app'
    } else {
        domain = 'https://us-central1-loan-planning-app.cloudfunctions.net/app'
    }
    try {
        const res = await fetch(domain + path);
        toasterCustom.success(Alert.HTTP_SUCCESS)
        return res.json();
    }
    catch(err) {
        toasterCustom.danger(Alert.HTTP_ERROR);
        return Promise.reject(err);
    }
}