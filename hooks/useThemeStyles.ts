// hooks/useThemedStyles.ts
import { useThemeColor } from "@/hooks/useThemeColor";

export function useThemeStyles() {
  return {
    border: useThemeColor({}, "border"),
    text: useThemeColor({}, "text"),
    background: useThemeColor({}, "background"),
  };
}
