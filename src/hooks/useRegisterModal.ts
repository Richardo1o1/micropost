import { create } from "zustand";

interface useRegisterModal{
  isOpen: boolean;
  onOpen: ()=> void;
  onClose: ()=> void;
};

const useRegisterModal = create<useRegisterModal>((set) =>({
  isOpen: false,
  onOpen: () => set({ isOpen: true}),
  onClose: () => set({ isOpen: false})
}));

export default useRegisterModal;