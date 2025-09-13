import { create } from "zustand";

interface RegisterState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setRole: (role: string) => void;
  reset: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setRole: (role) => set({ role }),
  reset: () =>
    set({ name: "", email: "", password: "", confirmPassword: "", role: "" }),
}));
