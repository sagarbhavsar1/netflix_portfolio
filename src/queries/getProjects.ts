// queries/getProjects.ts
import { Project } from '../types';
import projectsData from '../data/projects.json';

export async function getProjects(): Promise<Project[]> {
  // Return local JSON data instead of DatoCMS
  return projectsData as Project[];
}
