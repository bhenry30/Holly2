const countryCodes = [ "CN", "IN", "US", "ID", "BR", "PK", "BD", "NG", "RU", "JP", "MX", "PH", "VN", "ET", "DE", "EG", "TR", "IR", "CD", "TH", "FR", "GB", "IT", "MM", "ZA", "KR", "CO", "ES", "UA", "TZ"]

// const mexico = ["MX"]

// [ "AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO", "BN", "BG", "BF", "BI", "CV", "KH", "CM", "CA", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "DE", "GE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MK", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS", "ES", "LK", "SD", "SR", "SJ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW" ];


// sets bookmarks to sliding side nav
const setBookmarks = () => {
    const localStorageArray = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const value = localStorage.getItem(key)
        localStorageArray[i] = key + ": " + value
        localStorageArray.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date)
            }
        )
        
        // $("#bookmarks").append(`<h6>${key}: ${value}</h6>`)
    };
    localStorageArray.map(function appendBookmark(bookmark) {
        $("#bookmarks").append(`<h6> ${bookmark}</h6>`)
    })
};
setBookmarks();

const today = new Date();
let dd = String(today.getDate()).padStart(2, '')
let mm = String(today.getMonth() + 1).padStart(2, '')
let monthName = today.toLocaleString('en-us', { month: 'long' });
let yyyy = today.getFullYear()

const getHoliday = () => {
    // sets date variables
    
    
    countryCodes.map((countryCode) => {
        async function fetchData(){
            const countryCodes = countryCode.toLowerCase();
            const response = await fetch(`https://calendarific.com/api/v2/holidays?api_key=9482cbc8381d91c591e0818d55fcc0aa976b1b75&country=${countryCodes}&day=${dd}&month=${mm}&year=${yyyy}`)
            const holidays = await response.json()
            

            if (holidays.response.holidays.length !== 0) {
                holidays.response.holidays.map(function(holiday) { 
                    function displayCard(data) {
                        console.log(data)
                        const { name, type, description, country } = holiday;
                        const card = document.getElementById("card-fetch");
                        let uuid = self.crypto.randomUUID()
                        const holidayIdentifier = name.replace(/ /g, '') + uuid
                    

                        // inserts cards into html with data from holidays
                        card.insertAdjacentHTML('beforeend', `
                            <div class="card sticky-action">
                                <div class="card-content">
                                <div id="holiday">
                                    <img style="clear: right" class="flag" src="https://flagcdn.com/w640/us.png" srcset="https://flagcdn.com/w1280/${countryCodes}.png"
                                   width='200px'
                                    alt="${country.name}">
                                </div>
                                    <span class="card-title activator grey-text text-darken-4">
                                        <h4 id="holiday-name-${holidayIdentifier}" class="teal-text element-name text-darken-3">${name}</h4>
                                        </span>
                                    <h5>Celebrated In: ${country.name}<br>
                                    ${type} on ${monthName} ${dd}</h5>
                                    <p>${description}</p><br>
                                </div>
                                <div class="card-action row">
                                    <a class="teal white-text flex col s12 m3 3 hoverable" style="padding: .8rem" href="https://en.wikipedia.org/wiki/${name}" target="_blank">Learn More</a>
                                    <a id="bookmarkBtn-${holidayIdentifier}" class="bookmarkBtn red accent-2 white-text flex col s12 m3 3 hoverable" style="padding: .8rem;">Bookmark holiday</a>
                                </div>
                            </div> `);
                            function setListeners() {
                                const bookmarkBtns = document.querySelectorAll('.bookmarkBtn')
                                console.log(bookmarkBtns)
                                bookmarkBtns.forEach(function(bookmarkBtn) {
                                    bookmarkBtn.addEventListener('click', function(e) {
                                    const bookmarkBtnTarget = e.target
                                    // const lhi = bookmarkBtn.id.slice(12)
                                    // const localHolidayIdentifier = lhi.slice(-36);
                                    const nameEl = bookmarkBtnTarget.parentElement.parentElement.querySelector('.card-title').innerText
                                    const dateEl = mm + '/' + dd + '/' + yyyy;
                                    localStorage.setItem(nameEl, dateEl);
                                })
                                })}
                            setListeners();    
                        }
                        displayCard(holidays);
                })
            }}
                fetchData()
            })      
        }
        getHoliday()


