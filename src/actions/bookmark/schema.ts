import { z } from 'zod';

export const BookmarkCreateSchema = z.object({
  contentId: z.number(),
});
export const BookmarkDeleteSchema = z.object({
  id: z.number(),
});
export const TimestampCreateSchema = z.object({
  contentId: z.number(),
  time: z.number(),
  label: z.string(),
});
export const TimestampDelelteSchema = z.object({
  id: z.number(),
});
