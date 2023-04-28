// ****************** font family ************************
const FONTFAMILY = {
    HEADER:'RemachineScript_Personal_Use',
    NORMAL:'Inter-Regular'
}

//================== Api Credentials =======================
const CREDENTIALS = {
    URL:`Enter your API URL here`,
    KEY:`Enter your API Key here`
} 

//================== REGEX =============================//
const REGEX = {
    NAME:/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    EMAIL:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    MOBILE:/^[6-9]\d{9}$/,
    PASSWORD:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
}

//================= Colors =============================
const COLORS = {
    GREEN:'#2A676F',
    ORANGE:'#FFB257',
    WHITESHADOW:'#E9E4E4',
} 

export {
    FONTFAMILY,
    REGEX,
    COLORS,
    CREDENTIALS
}