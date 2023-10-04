export const namefile = (file: File): string => {
    console.log(JSON.stringify(file));
    const name = Date.now() + file.name
    return name;
}