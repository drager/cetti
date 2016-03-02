declare module 'react-mdl' {
  import * as React from 'react';

  interface Properties {
    className?: string;
    key?;
    style?: Object;
  }

  interface CardProperties extends Properties {
    shadow?: number;
    onClick?: (event: MouseEvent) => void;
  }

  interface DrawerProperties extends Properties {
    title: string;
  }

  interface IconButtonProperties extends Properties {
    colored?: boolean;
    name: string;
    onClick?: (event: MouseEvent) => void;
  }

  interface LayoutProperties extends Properties {
    fixedDrawer?: boolean;
  }

  export class Card extends React.Component<CardProperties, {}> {}
  export class Content extends React.Component<Properties, {}> {}
  export class Drawer extends React.Component<DrawerProperties, {}> {}
  export class IconButton extends React.Component<IconButtonProperties, {}> {}
  export class Layout extends React.Component<LayoutProperties, {}> {}
  export class Navigation extends React.Component<Properties, {}> {}
}
