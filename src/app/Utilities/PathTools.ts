import { environment } from "../environments/environment";

export const DomainName = environment.production ? 'https://Api.novinatra.ir/' : 'https://localhost:7161/'
// export const ImagePath = DomainName + '/images/products/origin/';
// export const GalleryPath = DomainName + '/images/product/';
// export const SliderPath = DomainName + '/images/sliders/origin/';
