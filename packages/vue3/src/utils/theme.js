export function toggleTheme() {
  const currentTheme = document.body.getAttribute("isle-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.body.setAttribute("isle-theme", newTheme);
}

export function changeTheme(theme) {
  const validThemes = ["light", "dark"];

  if (validThemes.includes(theme)) {
    document.body.setAttribute("isle-theme", theme);
  } else {
    console.warn(
      `Invalid theme: ${theme}. Please choose either 'light' or 'dark'.`,
    );
  }
}
