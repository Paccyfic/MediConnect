import {
  AppointmentFocusedIcon,
  AppointmentIcon,
} from "@/assets/icons/AppointmentSvg";
import { ArticleFocusedIcon, ArticleIcon } from "@/assets/icons/ArticleSvg";
import { HistoryFocusedIcon, HistoryIcon } from "@/assets/icons/HistorySvg";
import { HomeFocusedIcon, HomeIcon } from "@/assets/icons/HomeSvg";
import { ProfileFocusedIcon, ProfileIcon } from "@/assets/icons/ProfileSvg";
import { Text } from "react-native";
import { SvgXml } from "react-native-svg";

 function CustomTabBarIcon({
  name,
  isFocused,
}: {
  name: string;
  isFocused: boolean;
}) {
  let iconPath: string;
  if (name === "ActionMenu") {
    iconPath = isFocused ? HomeFocusedIcon : HomeIcon;
  } else if (name === "Appointments") {
    iconPath = isFocused ? AppointmentFocusedIcon : AppointmentIcon;
  } else if (name === "History") {
    iconPath = isFocused ? HistoryFocusedIcon : HistoryIcon;
  } else if (name === "Articles") {
    iconPath = isFocused ? ArticleFocusedIcon : ArticleIcon;
  } else if (name === "Profile") {
    iconPath = isFocused ? ProfileFocusedIcon : ProfileIcon;
  } else {
    return;
  }

  return (
    <>
      <SvgXml xml={iconPath} />
    </>
  );
}
export default CustomTabBarIcon;