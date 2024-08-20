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

const mergeRecipes = (products) => {
    const mergedRecipes = {};
  
    products.forEach((product) => {
        product.recipe.forEach((item) => {
          // Tính lại quantity của ingredient trong recipe dựa trên quantity của sản phẩm
          const adjustedQuantity = item.quantity * product.quantity;
          const ingredientId = item.ingredient._id;
    
          if (mergedRecipes[ingredientId]) {
            // Nếu ingredient đã tồn tại, cộng thêm quantity đã được tính lại
            mergedRecipes[ingredientId].quantity += adjustedQuantity;
          } else {
            // Nếu ingredient chưa tồn tại, thêm mới vào mảng kết quả
            mergedRecipes[ingredientId] = {
                ingredient: item.ingredient._id,
                quantity: adjustedQuantity,
            };
          }
        });
      });
  
    // Chuyển từ object sang mảng
    return Object.values(mergedRecipes);
  };

export default {
    getDateNow,
    checkIdTable,
    convertDateFormat,
    mergeRecipes,
}