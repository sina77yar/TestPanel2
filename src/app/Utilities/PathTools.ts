import { environment } from "../environments/environment";

export const DomainName = environment.production ? 'https://api.office.novinatra.com/' : 'https://localhost:9000/'
// export const ImagePath = DomainName + '/images/products/origin/';
// export const GalleryPath = DomainName + '/images/product/';
// export const SliderPath = DomainName + '/images/sliders/origin/';
