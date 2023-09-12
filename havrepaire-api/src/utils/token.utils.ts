import jwtDecode from 'jwt-decode';
export const decodeToken = (token): Object => {
    const decoded = jwtDecode(token);
    return decoded;
}