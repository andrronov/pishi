export const useFetchUserPosts = async (supabase, userId) => {
   const {data, error} = await supabase.from('posts').select('*, profiles(*), post_likes(*)').eq('author', userId).order('created_at', {ascending: false})
      if(!error){
        return data
      } else {
         return error
      }
}