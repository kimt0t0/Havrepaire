import jwtDecode from 'jwt-decode';
import { DecodedToken } from 'src/interfaces/DecodedToken.interface';

export const decodeToken = (token): DecodedToken => {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
}