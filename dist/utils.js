/**
 * Takes in a number in string format and use regular expression (RegEx)
 * to include comma as thousands separator.
 *
 * @param num number in string format
 * @returns formatted numbr in string format, with comma as thousands separator
 */
export function addThousandSeparator(num) {
    return ('' + num).replace(/(\d)(?=(?:\d{3})+(?:\.|$))|(\.\d\d?)\d*$/g, function (m, s1, s2) {
        return s2 || (s1 + ',');
    });
}
export function formatToThousands(val) {
    if (val.trim() === '')
        return val;
    var valArray = val.split(' ');
    var valArrayParsed = valArray.map(function (item) { return addThousandSeparator(item); });
    var formattedDisplay = valArrayParsed.join(' ');
    return formattedDisplay;
}
