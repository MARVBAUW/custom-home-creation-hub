
/// <reference types="vite/client" />

// Add missing React types to avoid TypeScript errors
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
  
  // Add additional types to fix forwardRef component issues
  interface ForwardRefExoticComponent<P> extends React.ExoticComponent<P> {
    (props: P): React.ReactElement | null;
  }
  
  // Add ElementType definition that's compatible with our component structure
  type ElementType<P = any> = 
    | string
    | React.ComponentType<P>
    | React.ForwardRefExoticComponent<P>;
    
  // Add RefAttributes for forwardRef components
  interface RefAttributes<T> extends React.Attributes {
    ref?: React.Ref<T>;
  }
}

// Ensure the sitemap.xml file is properly handled
declare module '*.xml' {
  const content: string;
  export default content;
}

// Improve Radix UI type definitions
declare module '@radix-ui/react-accordion' {
  const Root: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  const Item: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'>>;
  const Header: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'h3'>>;
  const Trigger: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'button'>>;
  const Content: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'>>;
  
  export {
    Root,
    Item,
    Header,
    Trigger,
    Content
  }
}

declare module '@radix-ui/react-alert-dialog' {
  const Root: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  const Trigger: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'button'>>;
  const Portal: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  const Overlay: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'>>;
  const Content: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'>>;
  const Title: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'h2'>>;
  const Description: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'p'>>;
  const Action: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'button'>>;
  const Cancel: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'button'>>;
  
  export {
    Root,
    Trigger,
    Portal,
    Overlay,
    Content,
    Title,
    Description,
    Action,
    Cancel
  }
}

declare module '@radix-ui/react-avatar' {
  const Root: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'span'>>;
  const Image: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'img'>>;
  const Fallback: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'span'>>;
  
  export {
    Root,
    Image,
    Fallback
  }
}

declare module '@radix-ui/react-checkbox' {
  const Root: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'button'> & {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean | 'indeterminate') => void;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    id?: string;
  }>;
  const Indicator: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'span'>>;
  const CheckboxIndicator: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'span'>>;
  
  export {
    Root,
    Indicator,
    CheckboxIndicator
  }
}

// Fix DTUEmptyStateProps interface
interface DTUEmptyStateProps {
  type?: string;
  message?: any;
  description?: any;
}
