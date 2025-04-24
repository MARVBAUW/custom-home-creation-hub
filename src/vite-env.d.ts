
/// <reference types="vite/client" />

// Ajout des types manquants de React pour éviter les erreurs TypeScript
declare namespace React {
  type FC<P = {}> = React.FunctionComponent<P>;
  type ReactNode = React.ReactNode;
  type FormEvent<T = Element> = React.FormEvent<T>;
  type ChangeEvent<T = Element> = React.ChangeEvent<T>;
  type MouseEvent<T = Element> = React.MouseEvent<T>;
  type KeyboardEvent<T = Element> = React.KeyboardEvent<T>;
  
  interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    displayName?: string;
  }
}
