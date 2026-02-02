// queries/getCertifications.ts
import { Certification } from '../types';
import certificationsData from '../data/certifications.json';

export async function getCertifications(): Promise<Certification[]> {
  // Return local JSON data instead of DatoCMS
  return certificationsData as Certification[];
}
