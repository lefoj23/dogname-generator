export interface IJsonBinResponse {
    metadata: IJsonBinMetadata;
    record: any;
}
export interface IJsonBinMetadata {
    createdAt: string,
    id: string,
    name: string,
    private: string,
}
