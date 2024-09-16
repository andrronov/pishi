export default async function getPost(supabase, postId){
   console.log('getting posts', postId);
   const { data } = await supabase.from('posts').select().eq('id', postId)
   return data
}