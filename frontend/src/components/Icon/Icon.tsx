import React from "react";

const icons = {
  add: "/assets/icons/add.svg",
  addUser: "/assets/icons/addUser.svg",
  adminTools: "/assets/icons/adminTools.svg",
  analytics: "/assets/icons/analytics.svg",
  back: "/assets/icons/back.svg",
  burgerMenu: "/assets/icons/burgerMenu.svg",
  calendar: "/assets/icons/calendar.svg",
  chevronDown: "/assets/icons/chevronDown.svg",
  chevronUp: "/assets/icons/chevronUp.svg",
  chevronLeft: "/assets/icons/chevronLeft.svg",
  chevronRight: "/assets/icons/chevronRight.svg",
  close: "/assets/icons/close.svg",
  delete: "/assets/icons/delete.svg",
  dropdownArrow: "/assets/icons/dropdownArrow.svg",
  edit: "/assets/icons/edit.svg",
  forward: "/assets/icons/forward.svg",
  gridView: "/assets/icons/gridView.svg",
  listView: "/assets/icons/listView.svg",
  home: "/assets/icons/home.svg",
  lessons: "/assets/icons/lessons.svg",
  linked: "/assets/icons/linked.svg",
  logo: "/assets/icons/logo.svg",
  logOut: "/assets/icons/logOut.svg",
  notifications: "/assets/icons/notifications.svg",
  options: "/assets/icons/options.svg",
  posts: "/assets/icons/posts.svg",
  search: "/assets/icons/search.svg",
  settings: "/assets/icons/settings.svg",
  shareExternal: "/assets/icons/shareExternal.svg",
  statusDanger: "/assets/icons/statusDanger.svg",
  statusInfo: "/assets/icons/statusInfo.svg",
  statusWaiting: "/assets/icons/statusWaiting.svg",
  statusWarning: "/assets/icons/statusWarning.svg",
  subjects: "/assets/icons/subjects.svg",
  summer: "/assets/icons/summer.svg",
  winter: "/assets/icons/winter.svg",
  user: "/assets/icons/user.svg",
  userRole: "/assets/icons/userRole.svg",
  users: "/assets/icons/users.svg",
  room: "/assets/icons/room.svg",
  checkmark: "/assets/icons/checkmark.svg",
};

export type IconName = keyof typeof icons;

export const Icon: React.FC<{
  icon: IconName;
  size?: string | number;
  invert?: boolean;
  className?: string;
}> = ({ icon, size, invert, className }) => {
  return (
    <div
      className={"transition-all duration-200 ease-in ".concat(
        className ? className : "bg-accent-medium"
      )}
      style={{
        height: size ? size : "24px",
        width: size ? size : "24px",
        WebkitMaskImage: `url('${icons[icon]}')`,
        maskImage: `url('${icons[icon]}')`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        WebkitMaskPosition: "center center",
        maskRepeat: "no-repeat",
      }}
    ></div>
  );
};

export default Icon;
