export const _24to12 = (time24) => {
    let tokens = time24.split(":")
    let hours = parseInt(tokens[0])
    let meridiem = (hours >= 12) ? "PM" : "AM"
    hours = (hours > 12)? hours - 12 : (hours == 0)? 12 : hours

    return `${hours}:${tokens[1]} ${meridiem}`
}