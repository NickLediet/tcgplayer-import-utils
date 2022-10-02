import {importList, extractCard} from '../main';

describe('importList()', () => {
    it('it should create a list of cards', () => {
        const list = `
            TOTAL: 236 cards - $1,547.30 (3 cards missing price)
            1 Ugin, the Ineffable (JP Alternate Art) [WAR]
            1 Tamiyo, Collector of Tales (JP Alternate Art) [WAR]
            1 Nissa, Who Shakes the World (JP Alternate Art) [WAR]
        `;

        const value = importList(list);
        expect(value.length).toBe(3);
    });

    it('should not return items with whitespace in their names', () => {
        const list = `
            TOTAL: 236 cards - $1,547.30 (3 cards missing price)
            1 Ugin, the Ineffable (JP Alternate Art) [WAR]
            1 Tamiyo, Collector of Tales (JP Alternate Art) [WAR]
            1 Nissa, Who Shakes the World (JP Alternate Art) [WAR]
        `;

        const expectedList = [
            'Ugin, the Ineffable',
            'Tamiyo, Collector of Tales',
            'Nissa, Who Shakes the World'
        ];

        const importedList = importList(list);

        importedList.forEach((importItem, index) => {
            expect(importItem.name).toStrictEqual(expectedList[index]);
        });
    });

   it('should return a list of objects with the correct properties', () => {
        const list = `
            TOTAL: 236 cards - $1,547.30 (3 cards missing price)
            1 Ugin, the Ineffable (JP Alternate Art) [WAR]
            1 Tamiyo, Collector of Tales (JP Alternate Art) [WAR]
            1 Nissa, Who Shakes the World (JP Alternate Art) [WAR]
        `;

        const importItems = importList(list);
        
        importItems.forEach(importItem => {
            expect(importItem.hasOwnProperty('quantity')).toStrictEqual(true);
            expect(importItem.hasOwnProperty('name')).toStrictEqual(true);
            expect(importItem.hasOwnProperty('frame')).toStrictEqual(true);
            expect(importItem.hasOwnProperty('setCode')).toStrictEqual(true);
        });
   }) 

});

describe('extractImportLine()', () => {
    it('should return return a card', () => {
        const importLine = '1 Ugin, the Ineffable (JP Alternate Art) [WAR]';
        const expectedImport = 
            {
                quantity: 1,
                name: 'Ugin, the Ineffable',
                frame: 'JP Alternate Art',
                setCode: 'WAR'
            };
        const result = extractCard(importLine);

        expect(result).toEqual(expectedImport);
    })
})