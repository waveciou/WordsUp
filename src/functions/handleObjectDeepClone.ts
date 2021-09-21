const handleObjectDeepClone = (payload: {}) => JSON.parse(JSON.stringify(payload));

export default handleObjectDeepClone;
