interface IProps {
  children?: React.ReactNode;
}

interface IRouteItem {
  id: string;
  name: string;
  path: string;
}

export type { IProps, IRouteItem };
