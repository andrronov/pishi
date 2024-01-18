export default (async(supabase, userId) => {
   const followersRes = await supabase
    .from("followers")
    .select("who_followed, profiles:who_followed(*)")
    .eq('whos_following', userId);
  if (!followersRes.error) {
    return followersRes.data;
  } else {
   throw new Error(followersRes.error)
  }
})