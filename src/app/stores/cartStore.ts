import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {TProduct} from "@/interface/products";
import {toast} from "react-toastify";

interface CartItem extends TProduct {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    total: number;
    addToCart: (product: TProduct) => void;
    removeFromCart: (productId: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    clearCart: () => void;
}

const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            total: 0,

            addToCart: (product: TProduct) =>
                set((state) => {
                    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
                    const checkProduct = state.items.find((item) => item.id === product.id);

                    let updatedItems: CartItem[];
                    if (checkProduct) {
                        // Nếu sản phẩm đã có trong giỏ hàng, tăng quantity lên 1
                        updatedItems = state.items.map((item) =>
                            item.id === product.id
                                ? {...item, quantity: item.quantity + (product.quantity ?? 1)} // Tăng quantity lên 1
                                : item
                        );
                    } else {
                        // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới với quantity là 1
                        const newItem: CartItem = {...product, quantity: product.quantity ?? 1};  // Gán quantity mặc định là 1
                        updatedItems = [...state.items, newItem];
                    }

                    // Tính lại tổng giá trị giỏ hàng
                    const updatedTotal = updatedItems.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                    );

                    // Hiển thị thông báo thành công
                    toast.success("Add to cart successfully!", {
                        autoClose: 1500,
                        hideProgressBar: false,
                    });

                    return {items: updatedItems, total: updatedTotal};
                }),

            increaseQuantity: (id: number) =>
                set((state) => {
                    const updatedItems = state.items.map((item) =>
                        item.id === id ? {...item, quantity: item.quantity + 1} : item
                    );
                    const updatedTotal = updatedItems.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                    );

                    return {items: updatedItems, total: updatedTotal};
                }),

            decreaseQuantity: (id: number) =>
                set((state) => {
                    const updatedItems = state.items
                        .map((item) =>
                            item.id === id
                                ? {...item, quantity: item.quantity - 1}
                                : item
                        )
                        .filter((item) => item.quantity > 0); // Xóa sản phẩm nếu quantity <= 0
                    const updatedTotal = updatedItems.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                    );
                    return {items: updatedItems, total: updatedTotal};
                }),

            removeFromCart: (productId) =>
                set((state) => {
                    const updatedItems = state.items.filter((item) => item.id !== productId);
                    const updatedTotal = updatedItems.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                    );
                    toast.success("Remove product from cart successfully!", {
                        autoClose: 1500,
                        hideProgressBar: false,
                    });
                    return {items: updatedItems, total: updatedTotal};
                }),

            clearCart: () => set(() => ({items: [], total: 0})),
        }),
        {
            name: 'cart-storage',
        }
    )
);

export default useCartStore;
