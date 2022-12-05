/*import Firebase from './firebase';
import JWTAuth from './jwt';*/
import { baseUrl } from '@jumbo/utils/enums';
import axios from 'axios';
import BasicAuth from './Basic';

export const AuhMethods = {
  /*firebase: Firebase,
  jwtAuth: JWTAuth,*/
  basic: BasicAuth,
};
export const baseAxios = axios.create({
  baseURL: baseUrl,
});
