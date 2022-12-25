import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn?: boolean;
  token?: string;
  user?: {
    avatar: {
      url: string;
    };
    email: string;
    full_name: string;
    id: number;
    number: string;
    role: string;
  };
}

interface StoreState {
  auth: AuthState;
  language: string;
  changeLanguage: () => void;
  setLogin: (payload: any) => void;
  updateProfile: (payload: any) => void;
  setLogout: () => void;
}

const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        auth: {
          isLoggedIn: false,
        },
        language: 'ro',
        changeLanguage: () => {
          set((state) => ({ language: state?.language == 'ro' ? 'en' : 'ro' }));
        },
        setLogin: (payload) => {
          set((state) => ({
            auth: {
              isLoggedIn: true,
              token: payload?.token,
              user: payload?.user,
            },
          }));
        },
        updateProfile: (payload) => {
          set((state) => ({
            auth: payload,
          }));
        },
        setLogout: () => {
          set((state) => ({
            auth: {
              isLoggedIn: false,
            },
          }));
        },
      }),
      { name: 'Store' }
    )
  )
);

export default useStore;
