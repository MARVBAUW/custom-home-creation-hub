
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
  
  // Add ElementRef type for Radix UI components
  type ElementRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>["ref"] extends React.Ref<infer R> ? R : never;
}

// Ensure the sitemap.xml file is properly handled
declare module '*.xml' {
  const content: string;
  export default content;
}

// Update DTUEmptyStateProps interface definition
interface DTUEmptyStateProps {
  type?: 'empty' | 'error' | 'noResults';
  message?: string;
  description?: string;
}

// Improve Radix UI type definitions to match the actual component structure
declare module '@radix-ui/react-accordion' {
  import * as React from 'react';
  
  const Root: React.FC<React.ComponentProps<'div'> & { type?: string; collapsible?: boolean }>;
  const Item: React.ForwardRefExoticComponent<React.ComponentPropsWithRef<'div'> & { value: string }>;
  const Header: React.ForwardRefExoticComponent<React.ComponentPropsWithRef<'h3'>>;
  const Trigger: React.ForwardRefExoticComponent<React.ComponentPropsWithRef<'button'>>;
  const Content: React.ForwardRefExoticComponent<React.ComponentPropsWithRef<'div'> & { value: string }>;
  
  export {
    Root,
    Item,
    Header,
    Trigger,
    Content
  };
}

declare module '@radix-ui/react-alert-dialog' {
  import * as React from 'react';
  
  const Root: React.FC<React.ComponentProps<'div'>>;
  const Trigger: React.ForwardRefExoticComponent<React.ComponentPropsWithRef<'button'>>;
  const Portal: React.FC<React.ComponentProps<'div'>>;
  const Overlay: React.ForwardRefExoticComponent<React.ComponentPropsWithRef<'div'>>;
  const Content: React.ForwardRefExoticComponent<React.ComponentPropsWithRef<'div'>>;
  const Title: React.ForwardRefExoticComponent<React.ComponentPropsWithRef<'h2'>>;
  const Description: React.ForwardRefExoticComponent<React.ComponentPropsWithRef<'p'>>;
  const Action: React.ForwardRefExoticComponent<React.ComponentPropsWithRef<'button'>>;
  const Cancel: React.ForwardRefExoticComponent<React.ComponentPropsWithRef<'button'>>;
  
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
  };
}

declare module '@radix-ui/react-avatar' {
  import * as React from 'react';
  
  const Root: React.ForwardRefExoticComponent<React.ComponentPropsWithRef<'span'>>;
  const Image: React.ForwardRefExoticComponent<React.ComponentPropsWithRef<'img'>>;
  const Fallback: React.ForwardRefExoticComponent<React.ComponentPropsWithRef<'span'>>;
  
  export {
    Root,
    Image,
    Fallback
  };
}

declare module '@radix-ui/react-checkbox' {
  import * as React from 'react';
  
  const Root: React.ForwardRefExoticComponent<React.ComponentPropsWithRef<'button'> & {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean | 'indeterminate') => void;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    id?: string;
  }>;
  
  const Indicator: React.ForwardRefExoticComponent<React.ComponentPropsWithRef<'span'>>;
  
  export {
    Root,
    Indicator
  };
}

declare module '@radix-ui/react-collapsible' {
  import * as React from 'react';
  
  const Root: React.FC<React.ComponentProps<'div'> & {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
  }>;
  
  const Trigger: React.ForwardRefExoticComponent<React.ComponentPropsWithRef<'button'>>;
  const Content: React.ForwardRefExoticComponent<React.ComponentPropsWithRef<'div'>>;
  
  export {
    Root,
    Trigger,
    Content
  };
}
