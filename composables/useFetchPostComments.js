export default async function(supabase, postId) {
   const {data, error} = await supabase.from('post_comments')
   .select('*, profiles(id, avatar, name, surname), post_comment_likes(*)')
   .eq('post', postId)
   .order('created_at', {ascending: false})
   // .range(min, max)
   console.log('ccc', data);
      if(!error){
         return data
      } else{
         return error
      }
}