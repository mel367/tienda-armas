export const URL = window.location.hostname.includes("localhost")
  ? "http://localhost:3000"
  : "https://3000-firebase-tienda-armasgit-1748497386001.cluster-aj77uug3sjd4iut4ev6a4jbtf2.cloudworkstations.dev";

export const API_VERSION = "api/V1";

export const GET_PRODUCTS = `${URL}/${API_VERSION}/get-products`;

export const IMAGE_SHOW = `${URL}/uploads`;

export const REGISTER_USER = `${URL}/${API_VERSION}/register`;
export const LOGIN_USER = `${URL}/${API_VERSION}/login`;
