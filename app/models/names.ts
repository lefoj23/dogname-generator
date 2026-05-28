export interface INamesResponse {
    data: INamesData[];
}


export interface INamesData {
    id: string;
    title: string;
    definition: string;
    gender: string[];
    categories: string[];

}

