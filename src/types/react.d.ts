
import 'react';

declare module 'react' {
  export type FC<P = {}> = React.FunctionComponent<P>;
  export import useState = React.useState;
  export import useEffect = React.useEffect;
  export import Suspense = React.Suspense;
  export import Component = React.Component;
  export import ComponentType = React.ComponentType;
}
