declare module '@react-navigation/native' {
  import * as React from 'react'
  import { NavigationContainerComponent, NavigationContainerProps } from '@react-navigation/core'

  export function useNavigation(): NavigationContainerComponent

  export class NavigationContainer extends React.Component<NavigationContainerProps> {}
}