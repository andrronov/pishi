export default async function(supabase, postId) {
   const {data, error} = await supabase.from('post_comments')
   .select('*, profiles(id, avatar, name, surname)')
   .eq('post', postId)
   .order('created_at', {ascending: false})
   // .range(min, max)
      if(!error){
         console.log('comms', data);
         return data
      } else{
         return error
      }
}