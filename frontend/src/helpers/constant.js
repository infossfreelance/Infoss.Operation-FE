import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

export const API_URL = process.env.REACT_APP_API_URL;
export const API_URL_MASTER = process.env.REACT_APP_API_URL_MASTER;
export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const SHIPMENT_ORDER = process.env.REACT_APP_SHIPMENT_ORDER;
export function numFormat(num) {
    return new Intl.NumberFormat('de-DE').format(num)
}
export function dateFormat(date) {
    let formatCode = 'dd/MM/yyyy'
    return format(new Date(date), formatCode, { locale: enUS })
}