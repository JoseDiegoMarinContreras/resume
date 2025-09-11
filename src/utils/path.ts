export const resumeURL = (path: string) => {
    const base = import.meta.env.BASE_URL;
    const _path = path.startsWith('/') ? path : '/' + path;

    return `${base}${_path}`;
}