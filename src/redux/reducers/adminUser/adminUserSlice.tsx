import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  adminUser: [
    {
      "id": 1,
      "avata": "https://robohash.org/estdoloremqueminus.png?size=50x50&set=set1",
      "username": "cbattell0",
      "email": "dleddy0@businessweek.com",
      "password": "pcI1ChmewCw",
      "accountType": "Free",
      "created_at": "06/12/2022"
    },
    {
      "id": 2,
      "avata": "https://robohash.org/hicundequia.png?size=50x50&set=set1",
      "username": "wlyenyng1",
      "email": "nmaccorkell1@fc2.com",
      "password": "SKv0cQ",
      "accountType": "Premium",
      "created_at": "08/11/2022"
    },
    {
      "id": 3,
      "avata": "https://robohash.org/consequaturquiplaceat.png?size=50x50&set=set1",
      "username": "spalffrey2",
      "email": "lmaleck2@timesonline.co.uk",
      "password": "FsyvUIZs",
      "accountType": "Free",
      "created_at": "26/03/2023"
    }
  ],
};

const adminUserSlice = createSlice({
  name: 'adminUser',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {id, updatedUser} = action.payload;
      state.adminUser = state.adminUser.map(user => {
        if (user.id === id) {
          return Object.assign({}, user, updatedUser);
        }
        return user;
      });
    },
    deleteUser: (state, action) => {
      const {id} = action.payload;
      state.adminUser = state.adminUser.filter(user => user.id !== id);
    },
  },
});

export const {updateUser, deleteUser} = adminUserSlice.actions;

export default adminUserSlice.reducer;
