
export const thunkAction = <T = undefined>(
  callback: (payload: T, config: any) => Promise<any>,
) => {
  return async (payload: T, config: any) => {
    try {
      const res = await callback(payload, config);
      return res?.data || res;
    } catch (error: any) {
      if (error?.response) {
        return config.rejectWithValue(error?.response?.data);
      }

      throw new Error(error?.message);
    }
  };
};