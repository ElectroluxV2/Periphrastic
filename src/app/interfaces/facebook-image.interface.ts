export interface FacebookImage {
    sizes: {
        height: number;
        width: number;
        jpg: string;
        webp?: string;
    }[];
    link: string;
    id: number;
}