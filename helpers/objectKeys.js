export const objectKeys = (body, array, string) => {
    Object.keys(body).forEach(key => {
        if(key.startsWith(string)) array.push(body[key]);
    });
};