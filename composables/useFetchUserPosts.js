export const useFetchUserPosts = async (supabase, userId) => {
   const userPostsRes = await supabase.from('posts').select('*, profiles(*), post_likes(*)').eq('author', userId).order('created_at', {ascending: false})
      if(!userPostsRes.error){
        return userPostsRes.data
      } else {
         return userPostsRes.error
      }
}