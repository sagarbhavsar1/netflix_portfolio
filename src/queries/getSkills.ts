// queries/getSkills.ts
import skillsData from '../data/skills.json';
import { Skill } from '../types';

export async function getSkills(): Promise<Skill[]> {
  // Using local JSON data instead of DatoCMS
  return skillsData as Skill[];
}
