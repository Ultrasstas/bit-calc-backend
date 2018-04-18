
// in order to send function instead of action object to dispatch method we create this functions to cover actions
export function apiRequest(type) {
    return { type };
}

export function apiSuccess(type, payload) {
    return { type, payload };
}

export function apiFail(type, payload) {
    return { type, payload };
}