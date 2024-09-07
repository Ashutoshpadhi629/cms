'use server';
import { createSafeAction } from '@/lib/create-safe-action';
import {
  BookmarkCreateSchema,
  BookmarkDeleteSchema,
  TimestampCreateSchema,
  TimestampDelelteSchema,
} from './schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import db from '@/db';
import {
  InputTypeCreateBookmark,
  InputTypeCreateTimestamp,
  InputTypeDeleteBookmark,
  InputTypeDeleteTimestamp,
  ReturnTypeCreateBookmark,
} from './types';
import { revalidatePath } from 'next/cache';

const reloadBookmarkPage = () => {
  revalidatePath('/bookmarks');
};
//todo -> revalidate path for timestamps
const createBookmarkHandler = async (
  data: InputTypeCreateBookmark,
): Promise<ReturnTypeCreateBookmark> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'Unauthorized or insufficient permissions' };
  }

  const { contentId } = data;
  const userId = session.user.id;

  try {
    const addedBookmark = await db.bookmark.create({
      data: {
        contentId,
        userId,
      },
    });
    reloadBookmarkPage();
    return { data: addedBookmark };
  } catch (error: any) {
    return { error: error.message || 'Failed to create comment.' };
  }
};

const deleteBookmarkHandler = async (
  data: InputTypeDeleteBookmark,
): Promise<any> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'Unauthorized or insufficient permissions' };
  }
  const userId = session.user.id;
  const { id } = data;

  try {
    const deletedBookmark = await db.bookmark.delete({
      where: { id, userId },
    });
    reloadBookmarkPage();
    return { data: deletedBookmark };
  } catch (error: any) {
    return { error: error.message || 'Failed to create comment.' };
  }
};

const addTimeStampHandler = async (
  data: InputTypeCreateTimestamp,
): Promise<any> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'Unauthorized or insufficient permissions' };
  }
  const userId = session.user.id;

  try {
    const addedTimestamp = await db.timestamp.create({
      data: {
        userId,
        contentId: data.contentId,
        time: data.time,
        label: data.label,
      },
    });
    return { data: addedTimestamp };
  } catch (error: any) {
    return { error: error.message || 'Failed to add Timestamp.' };
  }
};
const deleteTimestmapHandler = async (
  data: InputTypeDeleteTimestamp,
): Promise<any> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'Unauthorized or insufficient permissions' };
  }
  const userId = session.user.id;
  const { id } = data;

  try {
    const deletedTimestamp = await db.timestamp.delete({
      where: { id, userId },
    });
    return { data: deletedTimestamp };
  } catch (error: any) {
    return { error: error.message || 'Failed to delete Timestamp.' };
  }
};
export const createBookmark = createSafeAction(
  BookmarkCreateSchema,
  createBookmarkHandler,
);
export const deleteBookmark = createSafeAction(
  BookmarkDeleteSchema,
  deleteBookmarkHandler,
);
export const addTimestamp = createSafeAction(
  TimestampCreateSchema,
  addTimeStampHandler,
);
export const deleteTimestamp = createSafeAction(
  TimestampDelelteSchema,
  deleteTimestmapHandler,
);
