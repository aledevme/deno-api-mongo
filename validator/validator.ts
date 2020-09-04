// deno-lint-ignore no-explicit-any
const isString = (obj: any) => {
    return typeof obj === "string";
}
const isValidId = (obj: any) => {

    //regex rule if id is valid
    var myregexp = /^[0-9a-fA-F]{24}$/;
    
    return obj.match(myregexp); 
}
 
export {
    isString, isValidId
}