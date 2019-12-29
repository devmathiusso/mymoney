import Rest from "../utils/rest";

const baseURL = "https://mymoney-mathiusso.firebaseio.com/";
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL);

export const useMonthApi = yearMonth => {
  const infoMonth = useGet(`months/${yearMonth}`);
  const [dataPatch, changeMonth] = usePatch(`months/${yearMonth}`);

  return { infoMonth, changeMonth };
};

export const useCashFlowApi = yearMonth => {
  const cashFlow = useGet(`cash-flow/${yearMonth}`);
  const [postData, saveNewFlow] = usePost(`cash-flow/${yearMonth}`);
  const [removeData, removeFlow] = useDelete();

  return { cashFlow, saveNewFlow, removeFlow };
};
