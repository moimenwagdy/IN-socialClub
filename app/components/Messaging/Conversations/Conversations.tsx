import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import getConversations from "./functions/getConversations";
import { conversationItemResponse } from "@/globalTypes/globalTypes";
import ConversationItem from "./ConversationItem";

const Conversations: React.FC<{ UnlimitedHight?: boolean }> = async ({
  UnlimitedHight,
}) => {
  const session = await getServerSession(authOptions);
  const result: {
    success: boolean;
    conversations: conversationItemResponse[];
  } = await getConversations(session?.user._id!);
  return (
    <>
      <ul
        className={`w-full space-y-3 px-2 py-2  ${
          !UnlimitedHight ? "max-h-72" : "max-h-screen"
        } overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-redColor
        `}>
        {result.success &&
          result?.conversations?.map((conversation) => {
            return (
              <ConversationItem
                key={conversation._id}
                participants={conversation.participants}
                lastMessage={conversation.lastMessage}
                lastUpdated={conversation.updatedAt || conversation.createdAt}
                participantsIDs={conversation.participantsIDS}
                conversationID={conversation._id}
              />
            );
          })}
      </ul>
    </>
  );
};
export default Conversations;
