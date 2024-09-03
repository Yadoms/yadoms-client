import semver from 'semver/preload';

export function IsVersion(version: string): boolean {
  return semver.valid(version) != null;
}
