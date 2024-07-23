'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function EditProduct() {
    const router = useRouter();
    const [product, setProduct] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { id } = router.query;

        if (id) {
            setLoading(true);
            fetch(`/api/product/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.product) {
                        setProduct(data.product);
                    } else {
                        toast.error(data.message || 'Sản phẩm không tồn tại');
                    }
                })
                .catch(err => toast.error('Lỗi khi lấy thông tin sản phẩm'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [router.query]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { productName, price, category, image } = e.target.elements;

        setErrors({});

        const newErrors = {};
        if (!/^[A-ZĐ][a-z]/.test(productName.value)) {
            newErrors.productName = 'Tên sản phẩm không được bắt đầu bằng số hoặc ký tự đặc biệt';
        }
        if (!/^\d+$/.test(price.value)) {
            newErrors.price = 'Giá sản phẩm phải là số';
        }
        if (!/^[a-zA-Z]/.test(image.value)) {
            newErrors.image = 'Ảnh sản phẩm không được bắt đầu bằng số hoặc ký tự đặc biệt';
        }
        if (!category.value) {
            newErrors.category = 'Loại sản phẩm không được để trống';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch(`/api/product/update/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productName: productName.value,
                    price: price.value,
                    category: category.value,
                    image: image.value,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Sửa sản phẩm thành công');
                router.push('/');
            } else {
                toast.error(data.message || 'Sửa sản phẩm thất bại');
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Chỉnh sửa sản phẩm</h1>
            <form onSubmit={handleSubmit} className="bg-white p-4 border border-gray-300 rounded-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                    <input
                        name="productName"
                        type="text"
                        defaultValue={product.productName || ''}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.productName && <p className="text-xs mt-1 text-red-500">{errors.productName}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Giá sản phẩm</label>
                    <input
                        name="price"
                        type="number"
                        defaultValue={product.price || ''}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.price && <p className="text-xs mt-1 text-red-500">{errors.price}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Ảnh sản phẩm</label>
                    <input
                        name="image"
                        type="text"
                        defaultValue={product.image || ''}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.image && <p className="text-xs mt-1 text-red-500">{errors.image}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Loại sản phẩm</label>
                    <select
                        name="category"
                        defaultValue={product.category || ''}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="" disabled>Chọn loại sản phẩm</option>
                        <option value="Đồ uống">Đồ uống</option>
                        <option value="Đồ ăn vặt">Đồ ăn vặt</option>
                    </select>
                    {errors.category && <p className="text-xs mt-1 text-red-500">{errors.category}</p>}
                </div>
                <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
                    Lưu
                </button>
            </form>
        </div>
    );
}
