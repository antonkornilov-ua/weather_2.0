export interface Photo {
    attribution: {
        license: string;
        photographer: string;
        site: string;
        source: string;
    };
    image: {
        mobile: string;
        web: string;
    };
}