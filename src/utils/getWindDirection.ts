export const getWindDirection = (deg: number): string => {
    if (deg >= 0 && deg < 22.5) {
        return 'Північний захід';
    } else if (deg >= 22.5 && deg < 67.5) {
        return 'Захід';
    } else if (deg >= 67.5 && deg < 112.5) {
        return 'Північний';
    } else if (deg >= 112.5 && deg < 157.5) {
        return 'Північно-східний';
    } else if (deg >= 157.5 && deg < 202.5) {
        return 'Схід';
    } else if (deg >= 202.5 && deg < 247.5) {
        return 'Південно-східний';
    } else if (deg >= 247.5 && deg < 292.5) {
        return 'Південний';
    } else if (deg >= 292.5 && deg < 337.5) {
        return 'Південно-західний';
    } else {
        return 'Захід';
    }
};
