import {create} from "zustand";

type CartStore = {
    countItem: number;
    incrementItem: () => void;
    decrementItem: () => void;
    initializeCountItemCart: () => void;
};

const apiUrlProxy = "/api/apiclient";

const useCartStore = create<CartStore>()((set) => ({
    countItem: 0,
    incrementItem: () => set((state) => ({countItem: state.countItem + 1})),
    decrementItem: () => set((state) => ({countItem: state.countItem - 1})),
    initializeCountItemCart: async () => {
        try {
            const response = await fetch(`${apiUrlProxy}/cart/count`);
            const data = await response.json();
            console.log(data.countItem);
            set({countItem: data.countItem});
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            set({countItem: 0})
        }
    },
}));

export default useCartStore;
