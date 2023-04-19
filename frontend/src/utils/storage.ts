export const getAccessToken = () => localStorage.getItem('access_token');
export const setAccessToken = (value: string) => localStorage.setItem('access_token', value);
