export interface IGetReqParams {
  page: number;
  size: number;
  queries: { [query: string]: string | string[] };
}
