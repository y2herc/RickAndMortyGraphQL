// Post-codegen script to fix Suspense hook overload incompatibility
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, '../src/generated/graphql.tsx');

if (!existsSync(filePath)) {
  console.log('No generated file found, skipping fix.');
  process.exit(0);
}

let content = readFileSync(filePath, 'utf8');

// Remove the first overload signature that causes the incompatibility
// Pattern: // @ts-ignore followed by export function useXSuspenseQuery(...): UseSuspenseQueryResult<Type, ...>;
content = content.replace(
  /\/\/ @ts-ignore\nexport function (\w+SuspenseQuery)\(baseOptions\?: ApolloReactHooks\.SuspenseQueryHookOptions<(\w+), (\w+)>\): ApolloReactHooks\.UseSuspenseQueryResult<\2, \3>;\n/g,
  ''
);

// Fix the return type of useSuspenseQuery calls to include | undefined
content = content.replace(
  /return ApolloReactHooks\.useSuspenseQuery<(\w+), (\w+)>\(/g,
  'return ApolloReactHooks.useSuspenseQuery<$1 | undefined, $2>('
);

writeFileSync(filePath, content, 'utf8');
console.log('✓ Fixed Suspense hook overloads in generated file');
