import { setupOrthographyChecker } from 'orthography-lib';

export type CheckOrthographySignature = ReturnType<
  typeof setupOrthographyChecker
>;

export type CheckOrthographyResult = ReturnType<CheckOrthographySignature>;
