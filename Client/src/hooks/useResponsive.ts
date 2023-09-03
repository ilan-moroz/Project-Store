import { useMediaQuery } from "react-responsive";

const useResponsive = () => {
  const isSmallDesktop = useMediaQuery({ query: "(max-width: 87.5em)" }); //1400px
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 50em)" }); //800px
  const isSmallScreen = useMediaQuery({ query: "(max-width: 40.62em)" }); //650px
  const isXsScreen = useMediaQuery({ query: "(max-width: 37.5em)" }); //600px

  return {
    isTabletOrMobile,
    isXsScreen,
    isSmallScreen,
    isSmallDesktop,
  };
};

export default useResponsive;