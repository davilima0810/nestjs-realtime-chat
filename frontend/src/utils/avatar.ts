function hashSeed(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function getAvatarUrl(seed: string) {
  const index = hashSeed(seed) % 100;
  const gender = hashSeed(seed) % 2 === 0 ? 'men' : 'women';

  return `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;
}
