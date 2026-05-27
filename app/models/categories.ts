export interface ICategoriesResponse {
    data: ICategoriesData[];
    filterGroups: IFilterGroups[];
}


export interface ICategoriesData {
    id: string;
    name: string;
    description: string;
}

export interface IFilterGroups {
    id: string;
    label: string;
    categoryIds: string[];
    isSelected?: boolean;
}