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
      className="p-2 bg-gray-800 flex gap-2 rounded-sm"
      type="single"
      value={theme}
      aria-label="Theme"
      onValueChange={handleThemeChange}
    >
      <ToggleGroup.Item
        className="w-10 h-10 shadow flex items-center justify-center rounded-sm data-[state=on]:bg-white data-[state=on]:text-black"
        value="light"
        aria-label="Light theme"
      >
        <SunIcon className="h-5 w-5" />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className="w-10 h-10 shadow flex items-center justify-center rounded-sm data-[state=on]:bg-white data-[state=on]:text-black"
        value="dark"
        aria-label="Dark theme"
      >
        <MoonIcon className="h-5 w-5" />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
