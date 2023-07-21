export const days = {
    0:"Domingo",
    1:"Lunes",
    2:"Martes",
    3:"Miércoles",
    4:"Jueves",
    5:"Viernes",
    6:"Sábado"
}

export const getDay = (day, days) =>{
    return days[new Date(day).getDay()]
}
export const getTime = (time) => {
    return new Date(time).toTimeString().split(' ')[0].split(':')
}