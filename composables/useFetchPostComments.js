export default async function(supabase, postId) {
   const commsResponse = await supabase.from('post_comments').select('*, profiles(*)').eq('post', postId)
      if(!commsResponse.error){
         return commsResponse.data
      } else{
         return error
      }
}