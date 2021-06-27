export const get_all = () => {
    return fetch('/api/local/all').then(response => response.json())
}