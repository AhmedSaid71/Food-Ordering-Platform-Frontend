import { ICheckoutSessionRequest } from "@/types";
import { api } from "@/utils";

export const createCheckoutSession = async (data: ICheckoutSessionRequest) => {
  try {
    const res = await api.post(
      "/orders/checkout/create-checkout-session",
      data
    );
    return { url: res.data.url };
  } catch (error) {
    console.log(error);
    return error;
  }
};
