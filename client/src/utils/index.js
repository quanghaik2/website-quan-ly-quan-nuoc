const getDateNow = () => {
    const currentDate = new Date();
    let start = new Date(currentDate);
    let end = new Date(currentDate);
    end.setDate(end.getDate() + 1);

    return {
        startDate: start.toISOString().split('T')[0],
        endDate: end.toISOString().split('T')[0],
    };
}

const checkIdTable = (tableId, orders) => {
    return orders.some((order) => order.tableId._id === tableId && order.status !== 'hoàn thành');
}

const convertDateFormat = (mongoDate) => {
    const date = new Date(mongoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần +1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export default {
    getDateNow,
    checkIdTable,
    convertDateFormat,
}