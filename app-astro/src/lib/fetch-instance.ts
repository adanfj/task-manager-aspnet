
// import axios from "ax"
// place files you want to import through the `$lib` alias in this folder.

import { validJSON } from "./utils";

const appFetch = async (url: string | URL, method = "GET", body?: FormData | object | string, defaultHeaders?: Record<string, string>, withCredentials = false) => {
    if (!body)
        body = undefined;
    let typeHeader: Record<string, string> | undefined = (typeof body == "object" && !(body instanceof FormData)) ||
        typeof body == "string"
        ? { "Content-Type": "application/json" }
        : undefined;
    if (defaultHeaders) typeHeader = { ...typeHeader, ...defaultHeaders }
    let options = {
        method,
        headers: typeHeader,
        body: method == "GET" ? undefined : (body !== undefined && typeof body == "object" && !(body instanceof FormData)
            ? JSON.stringify(body)
            : body),
    } as any;
    if (withCredentials) options.credentials = "include"
    if (method == "GET") {
        url = new URL(url)
        url.search = new URLSearchParams(body as Record<string, string>).toString()
        url = url.href
    }
    return /* const res = await  */fetch(url, options);
};

const appFetchData = async <T>(url: string, method = "GET", body?: FormData | object | string, defaultHeaders?: Record<string, string>, withCredentials = false) => {
    let json, res: Response;
    console.log(url);
    res = await appFetch(url, method, body, defaultHeaders, withCredentials);
    json = await res.text();
    if (validJSON(json)) json = JSON.parse(json);
    else if (res.status == 401) throw new Error("Unauthorized");
    else if (res.status == 400) throw new Error("Bad request");
    else if (res.status == 404) throw new Error("Not found");
    else if (res.status == 500) json = { error: "API Server Error" };
    else if (json.length) throw { error: json };
    else json = { error: "Cannot fetch data, check your input data" };
    return json as T | { error: string };
};

    /**
     * Function to convert a fetch request to a curl command so it can be copied and pasted to the terminal
     * @param {string | URL} url - The URL of the request
     * @param {string} [method="GET"] - The method of the request
     * @param {FormData | object | string} [body] - The body of the request
     * @param {Record<string, string>} [headers] - The headers of the request
     * @returns {string} The curl command equivalent of the fetch request
     */
const fetchToCurl = (url: string | URL, method = "GET", body?: FormData | object | string, headers?: Record<string, string>) => {

    const headersString = Object.entries(headers ?? {}).map(([key, value]) => `-H ${key}: ${value}`).join(" ")
    let data = "";
    if (method == "GET") {
        url = new URL(url)
        url.search = new URLSearchParams(body as Record<string, string>).toString()
        url = url.href
    } else {
        data = "-d ";
        if (typeof body == "object" && !(body instanceof FormData)) {
            data = `${data}${JSON.stringify(body)}`;
        }
    }
    return `curl -X ${method} ${headersString} ${url} ${data}`;
};

export class FetchInstance {
    public defaultHeaders: Record<string, string> = {};
    constructor(
        protected baseURL: string,
        protected withCredentials: boolean
    ) {
        this.baseURL = baseURL;
        this.withCredentials = withCredentials;

    }

    async get<T extends object>(path: string, body?: object) {
        console.log(fetchToCurl(`${this.baseURL}${path}`, "GET", body, this.defaultHeaders));
        let data = await appFetchData<T>(`${this.baseURL}${path}`, "GET", body, this.defaultHeaders, this.withCredentials);
        if (Object.hasOwn(data, "error")) throw new Error((data as { error: string }).error)
        return data as T
    }
    async post<T extends object>(path: string, body?: string | object | FormData) {
        console.log(fetchToCurl(`${this.baseURL}${path}`, "POST", body, this.defaultHeaders));
        let data = await appFetchData<T>(`${this.baseURL}${path}`, "POST", body, this.defaultHeaders, this.withCredentials);
        if (Object.hasOwn(data, "error")) throw new Error((data as { error: string }).error)
        return data as T
    }
    async put<T extends object>(path: string, body?: string | object | FormData, expectedData = false) {
        console.log(fetchToCurl(`${this.baseURL}${path}`, "PUT", body, this.defaultHeaders));
        if (expectedData) {
            let data = await appFetchData<T>(`${this.baseURL}${path}`, "PUT", body, this.defaultHeaders, this.withCredentials);
            if (Object.hasOwn(data, "error")) throw new Error((data as { error: string }).error)
            return data as T
        }
        let res = await appFetch(`${this.baseURL}${path}`, "PUT", body, this.defaultHeaders, this.withCredentials);
        if (res.status.toString().startsWith("2")) return true;
        else throw new Error("Cannot update data");
    }

    async delete<T extends object>(path: string, body?: string | object | FormData, expectedData = false) {
        console.log(fetchToCurl(`${this.baseURL}${path}`, "DELETE", body, this.defaultHeaders));
        if (expectedData) {
            let data = await appFetchData<T>(`${this.baseURL}${path}`, "DELETE", body, this.defaultHeaders, this.withCredentials);
            if (Object.hasOwn(data, "error")) throw new Error((data as { error: string }).error)
            return data as T
        }
        let res = await appFetch(`${this.baseURL}${path}`, "DELETE", body, this.defaultHeaders, this.withCredentials);
        if (res.status.toString().startsWith("2")) return true;
        else throw new Error("Cannot delete data");
    }
}

/**
 * Returns a FetchInstance that will make requests to the API server.
 *
 * The API server is assumed to be located at `http://api:8080/api`.
 *
 * If `defaultHeaders` is provided, it will be used to set the default headers for all requests.
 *
 * @param {Record<string, string>} [defaultHeaders] The default headers to use for all requests.
 * @returns {FetchInstance} A FetchInstance that will make requests to the API server.
 */
export const apiFetchInstance = (defaultHeaders?: Record<string, string>) => {
    let i = new FetchInstance("http://api:8080/api", true);
    i.defaultHeaders = defaultHeaders ?? {};
    return i;
};

/**
 * Returns a FetchInstance that will make requests to the same origin.
 *
 * The requests will be made to the same origin as the current page.
 *
 * If `defaultHeaders` is provided, it will be used to set the default headers for all requests.
 *
 * @param {Record<string, string>} [defaultHeaders] The default headers to use for all requests.
 * @returns {FetchInstance} A FetchInstance that will make requests to the same origin.
 */
export const appFetchInstance = (defaultHeaders?: Record<string, string>) => {
    let i = new FetchInstance("", true)
    i.defaultHeaders = defaultHeaders ?? {};
    return i;
}


