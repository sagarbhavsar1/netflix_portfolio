// queries/getContactMe.ts
import { ContactMe } from '../types';
import contactMeData from '../data/contactMe.json';

export async function getContactMe(): Promise<ContactMe> {
  // Return local JSON data instead of DatoCMS
  return contactMeData as ContactMe;
}
