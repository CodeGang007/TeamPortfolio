// Gender-based, professional default avatars.
// Uses two local business-formal icons (a suited man, a businesswoman) so
// signed-in users get a clean, professional picture instead of a casual/emoji
// one. Served from /public/avatars — no external dependency.

export type Gender = "male" | "female";

const MALE_AVATAR = "/avatars/male.webp";
const FEMALE_AVATAR = "/avatars/female.webp";

/** Formal avatar for a given gender. `seed` is accepted for API compatibility. */
export function formalAvatar(gender: Gender, _seed?: string): string {
  return gender === "female" ? FEMALE_AVATAR : MALE_AVATAR;
}

// One professional avatar per gender, for the avatar picker.
export const FORMAL_MALE_PRESETS = [MALE_AVATAR];
export const FORMAL_FEMALE_PRESETS = [FEMALE_AVATAR];

/** Infer gender from a saved avatar URL, if it is one of our presets. */
export function genderFromAvatarUrl(url: string | null | undefined): Gender | null {
  if (!url) return null;
  if (url === MALE_AVATAR) return "male";
  if (url === FEMALE_AVATAR) return "female";
  return null;
}
