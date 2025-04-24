
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
  type ElementType<P = any, T extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements> = 
    | { [K in T]: P extends JSX.IntrinsicElements[K] ? K : never }[T]
    | React.ComponentType<P>;
    
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

// Add proper types for Radix UI components
declare module '@radix-ui/react-accordion' {
  export interface AccordionItemProps {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
  }
  
  export interface AccordionTriggerProps {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
  }
  
  export interface AccordionContentProps {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
  }
}

declare module '@radix-ui/react-alert-dialog' {
  export interface AlertDialogOverlayProps {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
  }
  
  export interface AlertDialogContentProps {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
  }
  
  export interface AlertDialogTitleProps {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
  }
  
  export interface AlertDialogDescriptionProps {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
  }
  
  export interface AlertDialogActionProps {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
  }
  
  export interface AlertDialogCancelProps {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
  }
}

declare module '@radix-ui/react-avatar' {
  export interface AvatarProps {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
  }
  
  export interface AvatarImageProps {
    className?: string;
    [key: string]: any;
  }
  
  export interface AvatarFallbackProps {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
  }
}

declare module '@radix-ui/react-checkbox' {
  export interface CheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean | 'indeterminate') => void;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    id?: string;
    className?: string;
    [key: string]: any;
  }
}
