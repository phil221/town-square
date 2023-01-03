export default function convertDate(dateString){
    return new Date(dateString)
        .toLocaleDateString('en-us', 
            { 
                weekday: 'long', 
                year: "numeric", 
                month: "short", 
                day: "2-digit" 
            }
        )
}