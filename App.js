import React from 'react';
import { createStackNavigator,createAppContainer } from "react-navigation";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import cacheAssetsAsync from "./helpers/cacheAssetsAsync";
import assets from "./assets/index";
import NavigationService from "./components/Navigation/NavigationService";
import ToDo from "./pages/ToDo/ToDo";
import HeaderParams from "./components/Header/HeaderParams";
import MagentaHeaderStyle from './components/Header/MagentaHeader.style';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      assetsLoaded: false
    };

    this.loadAssetsAsync = async () => {
      try {
        await cacheAssetsAsync(assets);
      } finally {
        this.setState({ assetsLoaded: true });
      }
    };
  }

  componentDidMount() {
    this.loadAssetsAsync();
  }

  render() {
    const { assetsLoaded } = this.state;
    if (assetsLoaded) {
      const Root = createStackNavigator({
        ToDo: {
          screen: ToDo,
          navigationOptions: () => ({
            title: "Todo List",
            ...HeaderParams(MagentaHeaderStyle)
          })
        },
      });

      const Apps = createAppContainer(Root)

      return (
            <Apps
            />
      );
    }
    return <LoadingScreen />;
  }
}
