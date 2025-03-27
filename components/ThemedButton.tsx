import {
  SafeAreaView,
  TouchableOpacity,
  View,
  type ViewProps,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedButtonProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  ...otherPropsz
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: darkColor, dark: lightColor },
    "background"
  );

  return (
    <TouchableOpacity style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
