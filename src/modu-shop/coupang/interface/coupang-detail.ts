export interface CoupangDetailResponse {
  ok: boolean;
  error?: string;
  data?: CoupangDetailData;
}

export interface CoupangDetailData {
  '@context': string;
  '@type': string;
  sku: string;
  name: string;
  image: string[];
  description: string;
  offers: Offers;
  aggregateRating: AggregateRating;
}

export interface Offers {
  priceCurrency: string;
  shippingDetails: ShippingDetails;
  '@type': string;
  price: string;
  availability: string;
  url: string;
}

export interface ShippingDetails {
  shippingRate: ShippingRate;
  deliveryTime: DeliveryTime;
  '@type': string;
  shippingDestination: ShippingDestination;
}

export interface ShippingRate {
  '@type': string;
  value: string;
  currency: string;
}

export interface DeliveryTime {
  '@type': string;
  handlingTime: HandlingTime;
}

export interface HandlingTime {
  '@type': string;
  minValue: number;
  maxValue: number;
  unitCode: string;
}

export interface ShippingDestination {
  '@type': string;
  addressCountry: string;
  addressRegion: string[];
}

export interface AggregateRating {
  '@type': string;
  ratingValue: number;
  ratingCount: string;
}
