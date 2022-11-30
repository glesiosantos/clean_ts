export interface HashedComparer {
  compare(value: string, hashed: string): Promise<boolean>
}
