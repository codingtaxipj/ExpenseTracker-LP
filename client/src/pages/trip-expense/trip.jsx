import { PATH } from "@/router/routerConfig";
import NavMenu from "@/components/Navigation/NavMenu";

const Trip = () => {
  return (
    <NavMenu activeBtn={PATH.trip}>
      <div>this is trip</div>
    </NavMenu>
  );
};

export default Trip;
