import { createSlice } from '@reduxjs/toolkit'
// import("./dynamicimport.js").then((module) => {
//   console.log(module.default())
//   console.log('동적임포트')
// })
const initialState = {
  targetComponent:null,
  isOpen:false,
  transparent:false,
  message:'',
  confirmCallback:null
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    handleResetLayer: (state) => {
      state.targetComponent = null;
      state.isOpen = false;
      state.transparent=false;
      state.message = '';
      state.confirmCallback=null;

    },
    handleLayerMode: (state,action) => { // transparent:true => 백드롭 투명
      state.transparent = action.payload
    },
    handleOpenAlertLayer: (state,action) => {
      const {message,confirmCallback} = action.payload;
      state.isOpen = true
      state.targetComponent = 'AlertLayer'
      state.message = action.payload.message;
      confirmCallback ? state.confirmCallback = confirmCallback: null;

    },
    handleOpenCustomLayer: (state,action) => {
      state.isOpen= true;
      state.targetComponent=action.payload;
    },
    handleCloseLayer: (state,action) => {

      state.targetComponent = null;
      state.isOpen = false;
      state.transparent=false;
      state.message = '';
      state.confirmCallback=null;
    },
    handleUpdateLayer: (state, action) => {
      state.targetComponent = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { handleOpenAlertLayer,handleOpenCustomLayer, handleCloseLayer,handleUpdateLayer,handleResetLayer,handleLayerMode } = modalSlice.actions

export default modalSlice.reducer
