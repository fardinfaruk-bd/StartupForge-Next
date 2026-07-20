// app/actions.js (ba apnar suvidhamoto jekono directory)
'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateProfilePath() {
    revalidatePath('/profile');
}