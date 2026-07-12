// Real client feedback ONLY. The home-page testimonial section renders
// nothing while this array is empty — it lights up the moment a real,
// permissioned quote is added. Never seed it with invented quotes: a buyer
// who catches one fake testimonial discounts every true claim on the site.
//
// To add one: ask the client, get written OK to publish, then fill in:
// { quote: "...", author: "Full Name", role: "CTO", org: "MooveHub", slug: "verse-ai" }

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  org: string;
  /** Which system it refers to — links the quote to evidence. */
  slug: string;
}

export const testimonials: Testimonial[] = [];
