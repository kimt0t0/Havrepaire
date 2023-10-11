export const namefile = (file: File): string => {
    const name = Date.now() + file.name
    return name;
}