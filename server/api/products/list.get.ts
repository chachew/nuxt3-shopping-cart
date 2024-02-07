import { serverSupabaseClient } from '#supabase/server';
import { Database } from '@/types/database.types';

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);

  // Get all products
  return await supabase.from('products').select('*');
});
