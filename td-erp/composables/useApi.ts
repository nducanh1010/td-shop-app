import type { UseFetchOptions } from "#app";
import { useAuthStore } from "~/store/user";
import { useToast } from "./useToast";

interface DataResponse {
  data: any;
  pending: boolean;
  error: string | null;
  message?: string;
  refresh?: any;
}
const getConfig = () => {
  const auth = useAuthStore();
  let config_header: { [key: string]: string } = {
    "X-Api-Key": "BTC128M8093ILKR584ERM147IAGJ2IX2",
    "Api-Mode": "2",
  };

  if (auth.token) {
    config_header = {
      ...config_header,
      Authorization: `Bearer ${auth.token}`,
    };
  }

  return config_header;
};
const request = async <T>(
  url: string,
  method: any,
  options?: UseFetchOptions<T> & { expiresIn?: number },
  multipart?: boolean
) => {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  const BASE_API_URL = config.public.apiServer;
  const cleanedParams = Object.fromEntries(
    Object.entries(options?.params || {}).filter(([_, value]) => value !== "")
  );
  const error = ref<Boolean>(false);
  // case requet trong client gọi $fetch
  if (process.client) {
    const toast = useToast();
    try {
      const data = await $fetch<T>(`${BASE_API_URL}${url}`, {
        //@ts-ignore
        headers: {
          ...getConfig(),
          ...options?.headers,

          ...(multipart ? { "Content-Type": "multipart/form-data" } : {}),
        },
        method,
        params: { ...(cleanedParams || {}) },
        ...(!["GET", "HEAD", "DELETE"].includes(method)
          ? { body: options?.body || {} }
          : {}),
        onResponseError({ response }) {
          console.log("Err:", response);
          toast.error(`Lỗi hệ thống, vui lòng thử lại sau!`);
          error.value = true;
        },
        retry: 0,
      });
      return { data: toRef(data), error: error.value };
    } catch (e) {
      error.value = true;

      return { data: null, error: error.value };
    }
  }
  const finalOptions: UseFetchOptions<T> = {
    headers: {
      ...getConfig(),
      ...options?.headers,
      ...(multipart ? { "Content-Type": "multipart/form-data" } : {}),
    },
    method,
    params: { ...(cleanedParams || {}) },
    ...(!["GET", "HEAD", "DELETE"].includes(method)
      ? { body: options?.body || {} }
      : {}),

    transform(input) {
      return {
        ...input,
        fetchedAt: Date.now(),
      };
    },
    getCachedData(key) {
      // return nullish = re-fetched
      const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      if (!data) {
        return;
      }
      const expirationDate = new Date(data.fetchedAt);

      expirationDate.setTime(expirationDate.getTime());
      let isExpired = true;
      if (options && options.expiresIn) {
        isExpired = Date.now() - expirationDate.getTime() > options.expiresIn;
      }
      if (isExpired) return;
      return data;
    },
    onResponseError({ request, response }) {
      error.value = true;
      console.log("Err:", response._data);
    },
    retry: 0,
  };
  const data = await useFetch(`${BASE_API_URL}${url}`, {
    ...finalOptions,
    deep: false,
    lazy: true,
    server: true,
    watch: false,
  });
  return { ...data, error: error.value };
};
// ko để async do useFEtch đã xử lí r
export const useApi = <T = any>() => {
  const apiMethod =
    (method: string) =>
    async (
      path: string = "",
      options?: UseFetchOptions<T> & { expiresIn?: number },
      body?: any
    ) =>
      await request<T>(`${path}`, method, {
        ...options,
        ...(body || {}),
      });
  return {
    get: apiMethod("GET"),
    post: apiMethod("POST"),
    postMultipart: (
      url: string = "",
      body?: any,
      options?: UseFetchOptions<T>
    ) => request<T>(url, "POST", { ...options, body }, true),
    patch: apiMethod("PATCH"),
    put: apiMethod("PUT"),
    delete: apiMethod("DELETE"),
  };
};
