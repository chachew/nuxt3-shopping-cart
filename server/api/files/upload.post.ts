import { serverSupabaseClient } from '#supabase/server';
import { Database } from '@/types/database.types';
import { isSuperAdmin } from '@/utils/auth';

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);
  const isUserSuperAdmin = await isSuperAdmin(supabase);

  if (!isUserSuperAdmin) {
    throw createError({
      statusCode: 401
      // statusMessage: 'Unauthorized'
    });
  }

  const formData = await readFormData(event);
  const id = formData.get('id');
  const _file = formData.get('file') as File;

  const fileNameLong = _file.name.split(/[\s.]+/);
  const _fileName = [...fileNameLong];
  // const ext = _fileName.pop();
  const fileName = _fileName.join('_');

  const path = `${id}/${fileName}`;
  const { error } = await supabase.storage.from('product_images').upload(path, _file);

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error uploading file'
    });
  }

  const { data: url } = supabase.storage.from('product_images').getPublicUrl(path);

  return { public_url: url.publicUrl };
});
