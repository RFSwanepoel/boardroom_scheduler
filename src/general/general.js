/*
GLOBAL USE METHODS.
If you have a method that is used in more than one place in the UI, define it here. and import this file.
*/

import config from '@/config'

export default {
    stripTags: inputVal => inputVal.replace(/(<([^>]+)>)/ig, ""),
    sanitize: inputVal => inputVal.replace(/[^\w\s]/gi, ''),
    numbersOnly: inputVal => inputVal.replace(/\D/g, ''),
    createCustomDateFormat(formatOption) {
        let dateObject;
        let egObject = {
            dateToFormat: 'dateToFormat: date, for current time/date skip this parameter',
            formatString: 'string'
        };

        let formatString = formatOption.formatString || false;
    
        if(!formatOption){
            console.error('Error formatting, date no format date parameters where supplied, please pass parameters: \n"formatOption = %O', egObject);
            console.info(
                'String Formatting options for (Friday the 1st of January 2016 at 1:01:01 am ~ 01/01/2016 01:01:01):' +
                '\n\tDATE:'+
                '\n\t\t- #YYYY# for century and year eg: 2016 (CCYY).'+
                '\n\t\t- #YY# for only the year eg: 16 (YY).'+
                '\n\t\t- #M# for numerical month eg: 1.'+
                '\n\t\t- #MM# for numerical month eg: 01.'+
                '\n\t\t- #MMM# for abbreviated alphabetic month name eg: Jan.'+
                '\n\t\t- #MMMM# for alphabetic month name eg: January.'+
                '\n\t\t- #DD# for the numerical day eg: 1.'+
                '\n\t\t- #DD# for the numerical day eg: 01.'+
                '\n\t\t- #DDD# for abbreviated alphabetic name of day eg: Fri.'+
                '\n\t\t- #DDDD# for alphabetic name of day eg: Friday.'+
                '\n\t\t- #th# for the ordinal indicator eg: rd, th, st, nd (1st, 2nd, 3rd, 4th, 5th).'+
                '\n\tTIME:'+
                '\n\t\t- #h#  for hours eg: 1#.'+
                '\n\t\t- #hh# for hours 12 hour format eg: 01.'+
                '\n\t\t- #hhh#  for hours 24 hour format eg: 01#.'+
                '\n\t\t- #m# for minutes eg: 1.'+
                '\n\t\t- #mm# for minutes eg: 01.'+
                '\n\t\t- #s# for seconds eg: 1.'+
                '\n\t\t- #ss# for seconds eg: 01.'+
                '\n\t\t- #AMPM# for the meridiem indicator in uppercase eg: AM/PM.'+
                '\n\t\t- #ampm# for the meridiem indicator in lowercase eg: am/pm.'+
                '\n\t-EG:'+
                '\n\t-A formatting string: (#DDDD# the #D##th# of #MMMM# #YYYY# at #h#:#mm#:#ss# #ampm#) will Return -> "Friday the 1st of January 2016 at 1:01:01 am"'
            );
            return false;
        }
    
        if(!formatString){
            console.warn(`WARNING:::::::::::::::::::::::::::\n\t 
            no "formatString" parameter was supplied, please pass parameters: \n"formatOption = %O \nIf no string is sullpied it will default to: %s`, 
            egObject, `${config.dateFormatting.defaultDateformatString} ${config.dateFormatting.defaultTimeFormatString}`);
            console.info(
                'String Formatting options for (Friday the 1st of January 2016 at 1:01:01 am ~ 01/01/2016 01:01:01):' +
                '\n\tDATE:'+
                '\n\t\t- #YYYY# for century and year eg: 2016 (CCYY).'+
                '\n\t\t- #YY# for only the year eg: 16 (YY).'+
                '\n\t\t- #M# for numerical month eg: 1.'+
                '\n\t\t- #MM# for numerical month eg: 01.'+
                '\n\t\t- #MMM# for abbreviated alphabetic month name eg: Jan.'+
                '\n\t\t- #MMMM# for alphabetic month name eg: January.'+
                '\n\t\t- #DD# for the numerical day eg: 1.'+
                '\n\t\t- #DD# for the numerical day eg: 01.'+
                '\n\t\t- #DDD# for abbreviated alphabetic name of day eg: Fri.'+
                '\n\t\t- #DDDD# for alphabetic name of day eg: Friday.'+
                '\n\t\t- #th# for the ordinal indicator eg: rd, th, st, nd (1st, 2nd, 3rd, 4th, 5th).'+
                '\n\tTIME:'+
                '\n\t\t- #h#  for hours eg: 1#.'+
                '\n\t\t- #hh# for hours 12 hour format eg: 01.'+
                '\n\t\t- #hhh  for hours 24 hour format eg: 01#.'+
                '\n\t\t- #m# for minutes eg: 1.'+
                '\n\t\t- #mm# for minutes eg: 01.'+
                '\n\t\t- #s# for seconds eg: 1.'+
                '\n\t\t- #ss# for seconds eg: 01.'+
                '\n\t\t- #AMPM# for the meridiem indicator in uppercase eg: AM/PM.'+
                '\n\t\t- #ampm# for the meridiem indicator in lowercase eg: am/pm.'+
                '\n\t-EG:'+
                '\n\t-A formatting string: (#DDDD# the #D##th# of #MMMM# #YYYY# at #h#:#mm#:#ss# #ampm#) will Return -> "Friday the 1st of January 2016 at 1:01:01 am"'
    
            );
            formatString = `${config.dateFormatting.defaultDateformatString} ${config.dateFormatting.defaultTimeFormatString}`
        }
    
        if(!formatOption.dateToFormat){
            console.warn('Date Formatting warning, no "dateToFormat" parameter was supplied, the current time and date will be used to format the string.' +
                '\n If you would like to format another date please pass parameter "dateToFormat" in parameters object: \n"formatOption = %O', egObject);
    
            let now = new Date().getTime();
            dateObject = new Date(now);
        }else{
            dateObject = new Date(formatOption.dateToFormat);
        }
    
        let YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
    
        YY = ((YYYY = dateObject.getFullYear()) + "").slice(-2);
        MM = (M = dateObject.getMonth() + 1) < 10 ? ('0' + M) : M;
        MMM = (MMMM = config.dateFormatting.MONTHS[M - 1]).substring(0, 3);
        DD = (D = dateObject.getDate()) < 10 ? ('0' + D) : D;
        DDD = (DDDD = config.dateFormatting.DAYS[dateObject.getDay()]).substring(0, 3);
        th = (D >= 10 && D <= 20) ? 'th' : ((dMod = D % 10) == 1) ? 'st' : (dMod == 2) ? 'nd' : (dMod == 3) ? 'rd' : 'th';
        formatString = formatString.replace("#YYYY#", YYYY).replace("#YY#", YY).replace("#MMMM#", MMMM).replace("#MMM#", MMM).replace("#MM#", MM).replace("#M#", M).replace("#DDDD#", DDDD).replace("#DDD#", DDD).replace("#DD#", DD).replace("#D#", D).replace("#th#", th);
    
        h = (hhh = dateObject.getHours());
        if (h == 0) h = 24;
        if (h > 12) h -= 12;
        hh = h < 10 ? ('0' + h) : h;
        AMPM = (ampm = hhh < 12 ? config.dateFormatting.anteMeridiem : config.dateFormatting.postMeridiem).toUpperCase();
        mm = (m = dateObject.getMinutes()) < 10 ? ('0' + m) : m;
        ss = (s = dateObject.getSeconds()) < 10 ? ('0' + s) : s;
        return formatString.replace("#hhh#", hhh).replace("#hh#", hh).replace("#h#", h).replace("#mm#", mm).replace("#m#", m).replace("#ss#", ss).replace("#s#", s).replace("#ampm#", ampm).replace("#AMPM#", AMPM);
    }

}