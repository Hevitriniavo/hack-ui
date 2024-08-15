export function getUrlFrom(path = "") {
    const baseUrl = import.meta.env.VITE_API_URL;

    if (!baseUrl || typeof baseUrl !== 'string') {
        throw new Error('VITE_API_URL is not defined or is not a string.');
    }

    let adjustedPath = path;
    
    if (!adjustedPath.startsWith('/')) {
        adjustedPath = `/${path}`; 
    }

    return `${baseUrl}${adjustedPath}`;
}
