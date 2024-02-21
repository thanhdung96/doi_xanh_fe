import { customAxios } from "@app/utils/axios.custom";
import { AxiosResponse } from "axios";

export type HttpMethod = "get" | "post" | "put" | "patch";

export async function request<T, K>(
    url: string,
    method: HttpMethod,
    postData?: T,
    queryParams?: any,
): Promise<K> {
    return customAxios
        .request({
            method,
            url,
            params: { ...queryParams },
            data: { ...postData },
        })
        .then((response: AxiosResponse) => {
            return response.data;
        });
}

export async function get<T, K>(url: string, params?: T): Promise<K> {
    return request<T, K>(url, "get", undefined, params).then((value) => {
        return value;
    });
}

export async function patch<T, K>(
    url: string,
    data: T,
    params: any,
): Promise<K> {
    return request<T, K>(url, "patch", data, params).then((value) => {
        return value;
    });
}

export async function download(url: string): Promise<void> {
    const link = document.createElement("a");
    link.target = "_blank";
    link.download = "excel_file.xlsx";

    return customAxios.get(url, { responseType: "blob" }).then((data) => {
        link.href = URL.createObjectURL(new Blob([data.data, { type: "application/vnd.ms-excel" }]));
        link.click();
    });
}

