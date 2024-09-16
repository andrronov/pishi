export default async function(supabase, author, postId, commentText){
   try {
      const { data } = await supabase.from('post_comments').insert({author: author, post: postId, text: commentText}).select()
      return data
   } catch (error) {
      throw error
   }
}