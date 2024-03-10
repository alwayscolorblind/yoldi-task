import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import useSWR, { type SWRConfiguration, type SWRResponse } from 'swr'

export type LoginDto = {
  email: string;
  password: string;
};
export type ApiKeyDto = {
  value: string;
};
export type SignUpDto = {
  email: string;
  name: string;
  password: string;
};
export type ImageDto = {
  id: string;
  url: string;
  width: string;
  height: string;
};
export type ProfileDto = {
  name: string;
  email: string;
  slug: string;
  description: string | null;
  image: ImageDto;
  cover: ImageDto;
};
export type UpdateProfileDto = {
  name: string;
  imageId: string | null;
  password: string | null;
  slug: string;
  coverId: string | null;
  description: string | null;
};
export type AxiosConfig = {
  paramsSerializer?: AxiosRequestConfig['paramsSerializer'];
};
export type Config = {
  axios?: AxiosConfig;
};

export function initialize(axios: AxiosInstance, config?: Config) {
  const requests = makeRequests(axios, config?.axios)
  return {
    requests,
    queries: makeQueries(requests),
  }
}

function nullIfUndefined<T>(value: T): NonNullable<T> | null {
  return typeof value === 'undefined' ? null : value as NonNullable<T> | null
}

export const queryKeys = {
  myProfile: () => ['myProfile'] as const,
  user: (slug: string) => ['user', slug] as const,
  users: () => ['users'] as const,
  image: (id: string) => ['image', id] as const,
} as const
export type QueryKeys = typeof queryKeys;

function makeRequests(axios: AxiosInstance, config?: AxiosConfig) {
  return {
    login: (payload: LoginDto) => axios.request<ApiKeyDto>({
      method: 'post',
      url: `/api/auth/login`,
      data: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.data),
    signUp: (payload: SignUpDto) => axios.request<ApiKeyDto>({
      method: 'post',
      url: `/api/auth/sign-up`,
      data: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.data),
    myProfile: () => axios.request<ProfileDto>({
      method: 'get',
      url: `/api/profile`,
    }).then(res => res.data),
    updateMyProfile: (payload: UpdateProfileDto) => axios.request<ProfileDto>({
      method: 'patch',
      url: `/api/profile`,
      data: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.data),
    user: (slug: string) => axios.request<ProfileDto>({
      method: 'get',
      url: `/api/user/${slug}`,
    }).then(res => res.data),
    users: () => axios.request<ProfileDto[]>({
      method: 'get',
      url: `/api/user`,
    }).then(res => res.data),
    uploadImage: (payload: {
      file?: string;
    }) => axios.request<ImageDto>({
      method: 'post',
      url: `/api/image`,
      data: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => res.data),
    image: (id: string) => axios.request<ImageDto>({
      method: 'get',
      url: `/api/image/${id}`,
    }).then(res => res.data),
  } as const
}

export type Requests = ReturnType<typeof makeRequests>;
export type Response<T extends keyof Requests> = Awaited<ReturnType<Requests[T]>>;

function makeQueries(requests: Requests) {
  return {
    useMyProfile: (options?: SWRConfiguration<Response<'myProfile'>, unknown>): SWRResponse<Response<'myProfile'>, unknown> => useSWR(queryKeys.myProfile(), () => requests.myProfile(), options),
    useUser: (slug: string, options?: SWRConfiguration<Response<'user'>, unknown>): SWRResponse<Response<'user'>, unknown> => useSWR(queryKeys.user(slug), () => requests.user(slug), options),
    useUsers: (options?: SWRConfiguration<Response<'users'>, unknown>): SWRResponse<Response<'users'>, unknown> => useSWR(queryKeys.users(), () => requests.users(), options),
    useImage: (id: string, options?: SWRConfiguration<Response<'image'>, unknown>): SWRResponse<Response<'image'>, unknown> => useSWR(queryKeys.image(id), () => requests.image(id), options),
  } as const
}
