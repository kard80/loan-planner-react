export async function FetchData(path: string): Promise<any> {
    let domain = '';
    if (process.env.NODE_ENV === 'development') {
        domain = 'http://localhost:5001/loan-planning-app/us-central1/app'
    } else {
        domain = 'https://us-central1-loan-planning-app.cloudfunctions.net/app'
    }
    try {
        const res = await fetch(domain + path);
        return res.json();
    }
    catch(err) {
        return Promise.reject(err);
    }
}