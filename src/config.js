const localConfig = {
	baseUrl: `https://example.com`
};

export default {
    dummyModeTimout: 3000,
    apiConfig: {
        defaultHeaders: {
            "x-client-used": "PWA",
            "content-type": "application/json"
        },
        somePostRequestConfig: {
            method: "POST",
			url: `${localConfig.baseUrl}/someEndpoint`,
			mode: "cors"
        },
        someGetRequestConfig: {
            method: "POST",
			url: `${localConfig.baseUrl}/someEndpoint?param={SOME_PARAM}`,
			mode: "cors"
        }
    },
    dateFormatting: {
        anteMeridiem:'am',
        postMeridiem:'pm',
        MONTHS: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        DAYS: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        //2019-05-06 00:00
        defaultDateformatString: `#YYYY#-#MM#-#DD#`,
        defaultTimeFormatString: `#hhh#:#mm#`,
        /*
        String Formatting: 
        'DATE:
        '- #YYYY# for century and year eg: 2016 (CCYY).
        '- #YY# for only the year eg: 16 (YY).
        '- #M# for numerical month eg: 1.
        '- #MM# for numerical month eg: 01.
        '- #MMM# for abbreviated alphabetic month name eg: Jan.
        '- #MMMM# for alphabetic month name eg: January.
        '- #DD# for the numerical day eg: 1.
        '- #DD# for the numerical day eg: 01.
        '- #DDD# for abbreviated alphabetic name of day eg: Fri.
        '- #DDDD# for alphabetic name of day eg: Friday.
        '- #th# for the ordinal indicator eg: rd, th, st, nd (1st, 2nd, 3rd, 4th, 5th).
        'TIME:
        - #h#  for hours eg: 1#.
        - #hh# for hours 12 hour format eg: 01.
        - #hhh#  for hours 24 hour format eg: 01#.
        - #m# for minutes eg: 1.
        - #mm# for minutes eg: 01.
        - #s# for seconds eg: 1.
        - #ss# for seconds eg: 01.
        - #AMPM# for the meridiem indicator in uppercase eg: AM/PM.
        - #ampm# for the meridiem indicator in lowercase eg: am/pm.
        Example:'+
        -Formatting string: (#DDDD# the #D##th# of #MMMM# #YYYY# at #h#:#mm#:#ss# #ampm#) will Return -> "Friday the 1st of January 2016 at 1:01:01 am"'
        */
    },
    boardrooms: [
        {
            id: 1,
            class: 'green_room',
            name: 'The green room',
            location: 'some place',
            seating: 10,
            color: 'green',
            icon: 'rgb(3, 192, 60)',
            facilities: {
                projector: true,
                whiteboard: true,
                aircon: false,
                view: false
            }
        },
        {
            id: 2,
            class: 'red_room',
            name: 'The red room',
            location: 'some place',
            seating: 8,
            color: 'rgb(194, 59, 35)',
            icon: 'chair',
            facilities: {
                projector: false,
                whiteboard: true,
                aircon: true,
                view: false
            }
        },
        {
            id: 3,
            class: 'blue_room',
            name: 'The blue room',
            location: 'some place',
            seating: 6,
            color: 'rgb(87, 154, 190)',
            icon: 'chair',
            facilities: {
                projector: true,
                whiteboard: true,
                aircon: true,
                view: true
            }
        }
    ]
}