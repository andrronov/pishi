export default (async(supabase, postId, userId) => {
   await supabase.from('post_comments').delete().eq('post', postId)
   await supabase.from('posts').delete().eq('id', postId).eq('author', userId)
})