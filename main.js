export const SET_REGEX = /\s\[(.*)\]$/;
export const FRAME_QUANTITY = /\s\((.*)\)$/;
export const QUANTITY_REGEX = /^(\d)\s/;

export const extractCard = (importLine) => {
    const fields = [
        {
            key: 'setCode',
            regex: SET_REGEX
        },
        {
            key: 'frame',
            regex: FRAME_QUANTITY
        },
        {
            key: 'quantity',
            regex: QUANTITY_REGEX,
            value: (matches) => parseInt(matches[1])
        },
        {
            key: 'name',
            regex: /.*/,
            value: matches => matches[0]
        }
    ];

    const card = fields.reduce(
        (cardAcc, field) => {
            let matches = cardAcc.importLine.match(field.regex);
            cardAcc[field.key] = typeof field.value === 'function' ? 
                field.value(matches):
                matches[1];

            cardAcc.importLine = cardAcc.importLine.replace(matches[0], '');

            return cardAcc;
        },
        { importLine }
    );
    delete card.importLine;

    return card;
}

export const importList = (importString) => {
    const imports = importString.split('\n')
        .filter(line => /^\s*\d/.test(line))
        .map(line => extractCard(line.trim()));
    return imports;
};

/**
 * 
 * POC workflow
 * - load an array of extracted cards
 * - make a scryfall query with the setCode and 
 */