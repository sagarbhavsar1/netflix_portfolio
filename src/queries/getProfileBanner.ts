// queries/getProfileBanner.ts
import profileBannerData from '../data/profileBanner.json';
import { ProfileBanner } from '../types';

export async function getProfileBanner(): Promise<ProfileBanner> {
  // Using local JSON data instead of DatoCMS
  return profileBannerData as ProfileBanner;
}
