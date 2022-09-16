// const countryCodes = [ "CN", "IN", "US", "ID", "BR", "PK", "BD", "NG", "RU", "JP", "MX", "PH", "VN", "ET", "DE", "EG", "TR", "IR", "CD", "TH", "FR", "GB", "IT", "MM", "ZA", "KR", "CO", "ES", "UA", "TZ"]

const mexico = ["MX"]

// [ "AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO", "BN", "BG", "BF", "BI", "CV", "KH", "CM", "CA", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "DE", "GE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MK", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS", "ES", "LK", "SD", "SR", "SJ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW" ];

console.log(mexico)

// sets date variables
const today = new Date();
let dd = String(today.getDate()).padStart(2, '')
let mm = String(today.getMonth() + 1).padStart(2, '')
let yyyy = today.getFullYear()

// sets bookmarks to sliding side nav
const setBookmarks = () => {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const value = localStorage.getItem(key)
        $("#bookmarks").append(`<h6>${key}: ${value}</h6>`)
    };
};
setBookmarks();

const getHoliday = () => {
    mexico.forEach((country) => {
        const countryCode = country.toLowerCase();
        fetch(`https://calendarific.com/api/v2/holidays?api_key=9482cbc8381d91c591e0818d55fcc0aa976b1b75&country=${mexico}&day=${dd}&month=${mm}&year=${yyyy}`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
    })

    // fetches calendarific.com with b's API
    // fetch(`https://calendarific.com/api/v2/holidays?api_key=d9bccf97030e080aadddfbb2c2e49bfb1eb748b9&day=${dd}&month=${mm}&year=${yyyy}`)
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(err => console.error(err));
    // }

    // fetches holidayapi.com
    // fetch(`https://holidayapi.com/v1/holidays?pretty&key=3e55feff-d882-4106-adc4-a657a2712556&day=31&month=1&year=2022`, options)
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(err => console.error(err));
}       
getHoliday();