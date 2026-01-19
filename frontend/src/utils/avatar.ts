export function getAvatarUrl(seed: string) {
  return `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(
    seed,
  )}`;
}