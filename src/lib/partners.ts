import axiosInstance from "src/api/axiosInstance";

export interface Partner {
  id: number;
  name: string;
  category: string;
  subcategory? : string;
  logo: string;
  isPopular?: boolean;
  discount?: string;
  discountText?: string;
  promoCode?: string;
  description?: string;
  tags?: string[];
  storeAddress?: string;
  email?: string;
  phone?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
  hasMap?: string;
  url?: string;
  states?: string;
  partnership?:string[];
}

export const fetchPartner = async (): Promise<Partner[]> => {
  try {
    const response = await axiosInstance.get("/api/product", {
      withCredentials : true,
    });
    return response.data.map((item: any): Partner => {
      return {
        id: item.id,
        name: item.name,
        category: item.category?.name || '', // kalau category null, fallback ke empty string
        subcategory: item.subcategory?.name,
        logo: item.img,
        isPopular: item.partnership?.is_popular === 1,
        discount: item.voucher?.discount,
        discountText: item.voucher?.discount_text,
        promoCode: item.voucher?.code,
        description: item.description,
        tags: item.tag?.map((t: any) => t.name) || [],
        storeAddress: item.store_address,
        email: item.product_details?.email_link,
        phone: item.product_details?.phone_number,
        facebook: item.product_details?.facebook_link,
        instagram: item.product_details?.instagram_link,
        website: item.product_details?.website_link,
        hasMap: item.product_details?.maps_link,
        url: item.product_details?.url,
        states: item.state?.name || '',
        partnership : item.partnership  // kalau state null
      };
    });

  } catch (error) {

    throw error;
  }
};
