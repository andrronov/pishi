export default (async (supabase, userId) => {
  const chatsRes = [
    await supabase
      .from("chats")
      .select(
        "id, user1_id, user2_id, profiles:user2_id(*), chat_messages:id(*)"
      )
      .eq("user1_id", userId)
      .limit(1, { referencedTable: "chat_messages" })
      .order("created_at", {
        ascending: false,
        referencedTable: "chat_messages",
      }),
    await supabase
      .from("chats")
      .select(
        "id, user1_id, user2_id, profiles:user1_id(*), chat_messages:id(*)"
      )
      .eq("user2_id", userId)
      .limit(1, { referencedTable: "chat_messages" })
      .order("created_at", {
        ascending: false,
        referencedTable: "chat_messages",
      }),
  ];
  return chatsRes
});
