import { createSlice } from "@reduxjs/toolkit";

export const extraSlice = createSlice({
  name: "extra",
  initialState: {
    openedComponent: "Dashboard",
    isNavbarOpen: false,
    isViewProductModalOpen: false,
    isCreateProductModalOpen: false,
    isUpdateProductModalOpen: false,
  },
  reducers: {
    toggleComponent: (state, action) => {
      state.openedComponent = action.payload;
    },
    toggleNavbar: (state) => {
      state.isNavbarOpen = !state.isNavbarOpen;
    },
    toggleCreateProductModal: (state) => {
      state.isCreateProductModalOpen = !state.isCreateProductModalOpen;
      console.log(state.isCreateProductModalOpen);
    },
    toggleViewProductModal: (state) => {
      state.isViewProductModalOpen = !state.isViewProductModalOpen;
    },
    toggleUpdateProductModal: (state) => {
      state.isUpdateProductModalOpen = !state.isUpdateProductModalOpen;
    },
  },
});

export const {
  toggleComponent,
  toggleCreateProductModal,
  toggleNavbar,
  toggleUpdateProductModal,
  toggleViewProductModal,
} = extraSlice.actions;
export default extraSlice.reducer;
