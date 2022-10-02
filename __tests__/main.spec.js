import {importList} from '../main';

describe('main.js', () => {
    it('should return true', () => {
        const value = importList();

        expect(value).toBe(true);
    });
});