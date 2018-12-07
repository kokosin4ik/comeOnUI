export const handleResponse = (response) => {
    // debugger
    return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
    });
}