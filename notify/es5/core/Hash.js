export default class Hash {
    static code(words) {
        let hash = 0;
        for (let i = 0, len = words.length; i < len; i++) {
            hash += words.charCodeAt(i);
        }
        return hash;
    }
}
