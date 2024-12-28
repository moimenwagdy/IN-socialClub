"use client";
import React from "react";
import NotificationsButton from "./NotificationsButton";
import { useNotifications } from "./functions/useNotifications";
import NotificationsList from "./NotificationsList";
import { useAppSelector } from "@/store/reduxHooks";

const NotificationsContainer: React.FC<{ userID: string }> = ({ userID }) => {
  const { notifications, notificationCount } = useNotifications(userID);
  const showNotifs = useAppSelector(
    (state) => state.ProfileAlertsSlice.showNotifs
  );
  return (
    <div className="relative">
      <NotificationsButton notifLength={notificationCount} />
      {showNotifs && <NotificationsList notifications={notifications} />}
    </div>
  );
};

export default NotificationsContainer;
