export const textMixin = {
    filters: {
        recersed(value) {
            return value.split('').reverse().join('');
        },
        textLength(value) {
            const num = value.length;

            return value + '(' + num + ')';
        }
    }
};