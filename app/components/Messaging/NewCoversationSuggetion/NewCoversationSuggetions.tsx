"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import getConversationsSuggetions from "./functions/getConversationsSuggetions";
import { usersuggestion } from "@/globalTypes/globalTypes";
import NewCoversationSuggetion from "./NewCoversationSuggetion";
import { FormEvent, useRef, useState } from "react";
import StartNewConversation from "../StartNewConversation/StartNewConversation";
import SuggestionsLoading from "../../FriendSuggetions/SuggestionsLoading";
import { useTranslations } from "next-intl";

const NewCoversationSuggetions = () => {
  const [users, setUsers] = useState<string[]>();
  const session = useSession();
  const formRef = useRef<HTMLFormElement>(null);
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["suggetions"],
    queryFn: () => getConversationsSuggetions(session.data?.user._id!),
    enabled: session.data?.user !== undefined,
  });
  const handleNewChat = (e: FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const selectedUsers = formData.getAll("usersData") as string[];
      if (selectedUsers.length !== 0 && session.data) {
        setUsers([...selectedUsers, session.data?.user._id!]);
        const time = setTimeout(() => {
          formRef.current?.reset();
          clearTimeout(time);
        }, 500);
      }
    }
  };
  const tConversation = useTranslations("conversations");
  return (
    <aside className="mt-10 w-full">
      {data?.success && (
        <header>
          <h2 className="text-redColor text-center font-bold">
            {tConversation("startNewChat")}
          </h2>
          <p className="text-black/50 dark:text-white/50 text-sm text-center">
            {tConversation("selectOneOreMore")}
          </p>
        </header>
      )}
      <form
        ref={formRef}
        onSubmit={handleNewChat}
        className="w-full flex flex-col items-center">
        {isLoading && <SuggestionsLoading />}
        {isSuccess && (
          <ul className="space-y-2 w-full max-h-60 overflow-y-auto py-1 px-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-redColor">
            {data.success &&
              data.users.map((user: usersuggestion) => {
                return (
                  <li key={user._id}>
                    <NewCoversationSuggetion user={user} />
                  </li>
                );
              })}
          </ul>
        )}
        {!data?.success && <p className="dark:text-white">{data?.error}</p>}
        {data?.success && (
          <button
            className="w-fit mx-auto mt-3 bg-black text-white dark:text-black dark:bg-offWhite px-3 py-1 font-descripFont text-sm"
            type="submit">
            {tConversation("startChat")}
          </button>
        )}
      </form>
      <>
        <StartNewConversation participantsIDs={users!}  />
      </>
    </aside>
  );
};
export default NewCoversationSuggetions;
