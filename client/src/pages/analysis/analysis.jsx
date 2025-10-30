import NavMenu from "@/components/Navigation/NavMenu";
import { PATH } from "@/router/routerConfig";
import { Index } from ".";


const Analysis = () => {
  return (
    <>
      <NavMenu activeBtn={PATH.analysis}>
        <Index />
      </NavMenu>
    </>
  );
};

export default Analysis;
