export const capitalize = (str) => {
    const arr = str.split(" ");
    arr.forEach((word, i) => {
        arr[i] = word.charAt(0).toUpperCase() + word.slice(1);
    });
    return arr.join(" ");
}