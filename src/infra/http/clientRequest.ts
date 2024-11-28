export interface ClientRequest<TData, TDataBody>{ 
    get: (url: string, params?: string, queryParams?: string) => TData[]
    post: (url : string, body: string, params?: string, queryParams?: string) => TDataBody 
}