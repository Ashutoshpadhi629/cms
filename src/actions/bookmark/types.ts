import { z } from 'zod';
import {
  BookmarkCreateSchema,
  BookmarkDeleteSchema,
  TimestampCreateSchema,
  TimestampDelelteSchema,
} from './schema';
import { ActionState } from '@/lib/create-safe-action';
import { Bookmark, Content, CourseContent, Timestamp } from '@prisma/client';

export type InputTypeCreateBookmark = z.infer<typeof BookmarkCreateSchema>;
export type ReturnTypeCreateBookmark = ActionState<
  InputTypeCreateBookmark,
  Bookmark
>;
export type InputTypeCreateTimestamp = z.infer<typeof TimestampCreateSchema>;
export type ReturnTypeCreateTimestamp = ActionState<
  InputTypeCreateTimestamp,
  Timestamp
>;
export type InputTypeDeleteTimestamp = z.infer<typeof TimestampDelelteSchema>;
export type ReturnTypeDeleteTimestamp = ActionState<
  InputTypeDeleteTimestamp,
  Timestamp
>;
export type InputTypeDeleteBookmark = z.infer<typeof BookmarkDeleteSchema>;
export type ReturnTypeDeleteBookmark = ActionState<
  InputTypeDeleteBookmark,
  Bookmark
>;

export type TBookmarkWithContent = Bookmark & {
  content: Content & {
    parent: { id: number; courses: CourseContent[] } | null;
  };
};
