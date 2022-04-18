const deepCloneObj = (obj: object) => JSON.parse(JSON.stringify(obj));

export default deepCloneObj;
