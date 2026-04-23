export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  relationship?: string;
  linkedinUrl?: string;
  date?: string;
}

/**
 * Testimonials from past managers, collaborators, and professors.
 *
 * HOW TO ADD A REAL ONE:
 *   1. Get a LinkedIn recommendation or a paragraph over email from someone
 *      who actually worked with you.
 *   2. Copy their exact words, do not edit or "tighten" the quote.
 *   3. Ask for their permission to post their full name + role publicly.
 *   4. Add an entry to the `testimonials` array below with their LinkedIn URL
 *      so recruiters can verify the quote is real.
 *
 * DO NOT fabricate, paraphrase, or AI-generate testimonials. A single fake
 * quote, googled by any recruiter, will erase every real credential on this
 * site.
 *
 * If the array is empty, the `<TestimonialWall />` component renders nothing
 *, the section disappears gracefully until real testimonials land.
 */
export const testimonials: Testimonial[] = [
  // Example shape (do not uncomment without a real source):
  //
  // {
  //   id: "ada-manager",
  //   quote:
  //     "Arnav shipped more meaningful backend in three months than engineers twice his level do in a year. He left the Nurse Panel API in better shape than any intern project I've seen.",
  //   author: "Jane Smith",
  //   role: "Engineering Manager",
  //   company: "ADA",
  //   relationship: "My manager during my Oct to Dec 2024 SWE internship",
  //   linkedinUrl: "https://www.linkedin.com/in/jane-smith/",
  //   date: "Jan 2025",
  // },
];

export function hasTestimonials(): boolean {
  return testimonials.length > 0;
}
