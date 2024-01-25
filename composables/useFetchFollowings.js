export default (async(supabase, userId) => {
   const {data, error} = await supabase
  .from('followers')
  .select('whos_following, profiles:whos_following(*)')
  .eq('who_followed', userId)
  if(!error){
     return data
  } else{
   throw new Error(error)
  }
})