export default (async(supabase, path, photo) => {
  const newPhotoName = Date.now() + (Math.random() * 1000).toFixed();
  try {
     const { data, error } = await supabase.storage.from(path).upload(newPhotoName, photo);
     return `https://ilabflsecnunffcornxh.supabase.co/storage/v1/object/public/${path}/` + data.path;
  } catch (error) {
   return error
  }
})