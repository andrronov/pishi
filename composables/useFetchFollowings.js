export default (async(supabase, userId) => {
   const followingRes = await supabase
  .from('followers')
  .select('whos_following, profiles:whos_following(*)')
  .eq('who_followed', userId)
  if(!followingRes.error){
     return followingRes.data
  } else{
   throw new Error(followingRes.error)
  }
})