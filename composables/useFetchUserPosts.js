// export default (async (supabase, userId) => {
//       const userPostsRes = await supabase.from('posts').select('*, profiles(*), post_likes(*)').eq('author', userId)
//       if(!userPostsRes.error){
//         return userPostsRes.data
//       } else {
//          return userPostsRes.error
//       }
// })
export const useFetchUserPosts = async (supabase, userId) => {
   const userPostsRes = await supabase.from('posts').select('*, profiles(*), post_likes(*)').eq('author', userId)
      if(!userPostsRes.error){
        return userPostsRes.data
      } else {
         return userPostsRes.error
      }
}