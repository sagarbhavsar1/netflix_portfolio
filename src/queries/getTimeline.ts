// queries/getTimeline.ts
import { TimelineItem } from '../types';
import timelineData from '../data/timeline.json';

export async function getTimeline(): Promise<TimelineItem[]> {
  // Return local JSON data instead of DatoCMS
  return timelineData as TimelineItem[];
}
