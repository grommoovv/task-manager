import moment from 'moment'

const formatDate = (date: string) => moment(date).format('DD/MM/YYYY')

export { formatDate }
