export interface DirectoryInstance {
  openTeam(key: string): void;
  destroy(): void;
}

export function mountDirectory(
  scope: Document | ShadowRoot,
  options: {
    data: unknown;
    descriptions?: Record<string, string>;
    names?: Record<string, string>;
    categories?: Record<string, string>;
    embedded?: boolean;
    showExperience?: boolean;
  },
): DirectoryInstance;
