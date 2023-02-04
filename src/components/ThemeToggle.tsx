import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

export type Theme = "light" | "dark";

type Props = {
  theme: Theme;
  onThemeChange: (newTheme: Theme) => void;
};

export function ThemeToggle({ onThemeChange, theme }: Props) {
  function handleThemeChange(newValue: string) {
    if (newValue === "dark") {
      onThemeChange("dark");
    } else {
      onThemeChange("light");
    }
  }

  return (
    <ToggleGroup.Root
      className="p-2 bg-gray-900 flex gap-1 rounded-sm"
      type="single"
      value={theme}
      aria-label="Theme"
      onValueChange={handleThemeChange}
    >
      <ToggleGroup.Item
        className="w-10 h-10 flex items-center justify-center rounded-sm text-gray-500 data-[state=on]:bg-gray-700 data-[state=on]:text-white"
        value="light"
        aria-label="Light theme"
      >
        <SunIcon className="h-5 w-5" />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className="w-10 h-10 flex items-center justify-center rounded-sm text-gray-500 data-[state=on]:bg-gray-700 data-[state=on]:text-white"
        value="dark"
        aria-label="Dark theme"
      >
        <MoonIcon className="h-5 w-5" />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
