export default async function(supabase, author, postId, commentText){
   const commentRes = await supabase.from('post_comments').insert({author: author, post: postId, text: commentText})
   if(!commentRes.error){
      return "true"
   } else {
      return commentRes.error
   }
}