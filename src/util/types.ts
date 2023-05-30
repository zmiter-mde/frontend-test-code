export type Pool<T> = Array<Promise<T> | null>
export type PooledResponse<T> = { response: T; promiseIndex: number }
export type Callback<T> = (arg: T) => Promise<T>
export type ResponseHandler<T> = (pooledResponse: PooledResponse<T>) => void
