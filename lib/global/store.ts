// import { create } from "zustand";

// export interface MeterNoState {
//   meterNo: string;
//   setMeterNo: (mMeterNo: string) => void;
// }

// export const useMeterNoStore = create<MeterNoState>()((set) => ({
//   meterNo: "000",
//   setMeterNo: (mMeterNo: string) =>
//     set((state) => {
//       return { meterNo: mMeterNo };
//     }),
// }));

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";

type tokenResStore = {
  responseBody: any;
  setResponseBody: (mResponseBody: any) => void;
};

const reducer = (set: any) => ({
  responseBody: null,
  setResponseBody: (mResponseBody: string) =>
    set((state: any) => ({ responseBody: mResponseBody })),
});

export const useTokenResStore = create(
  persist<tokenResStore>(reducer, {
    name: "response-storage", // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
  }),
);
