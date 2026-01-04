import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';
dotenv.config();

const schemaUrl = process.env.VITE_GRAPHQL_URL;
if (!schemaUrl) throw new Error('VITE_GRAPHQL_URL is required for codegen');

const config: CodegenConfig = {
  schema: {
    [schemaUrl]: {
      // optional headers for introspection:
      headers: {
        // Authorization: `Bearer ${process.env.CODEGEN_TOKEN}`,
      },
    },
  },
  documents: 'src/**/*.graphql',
  generates: {
    'src/generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
      config: {
        withHooks: true,
        useTypeImports: true,
        // Ensure generated hooks and types import react-specific exports from Apollo Client v4
        apolloReactCommonImportFrom: '@apollo/client/react',
        apolloReactHooksImportFrom: '@apollo/client/react',
        // Keep reactApolloVersion as 3 (compatible API surface for hooks)
        reactApolloVersion: 3
      }
    }
  }
};

export default config;