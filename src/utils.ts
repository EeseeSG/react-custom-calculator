/**
 * Takes in a number in string format and use regular expression (RegEx)
 * to include comma as thousands separator.
 * 
 * @param num number in string format
 * @returns formatted numbr in string format, with comma as thousands separator
 */
export function addThousandSeparator(num:string):string {
    return ('' + num).replace(
        /(\d)(?=(?:\d{3})+(?:\.|$))|(\.\d\d?)\d*$/g, 
        function(m, s1, s2){
            return s2 || (s1 + ',');
        }
    );
}


export function formatToThousands(val:string):string {
    if(val.trim() === '') return val;
    const valArray = val.split(' ');
    const valArrayParsed = valArray.map((item) => addThousandSeparator(item))
    const formattedDisplay = valArrayParsed.join(' ');
    return formattedDisplay
}
