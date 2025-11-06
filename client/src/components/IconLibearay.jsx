import { cardBgv2 } from "@/global/style";
import Flexcol from "./section/flexcol"; // Assuming paths
import Flexrow from "./section/flexrow"; // Assuming paths
import { cn } from "@/lib/utils"; // Assuming path
import { Icons } from "./icons";

/**
 * A component to display all icons in the Icons object.
 */
export const IconLibrary = () => {
  // Get an array of [key, Component] pairs from the Icons object
  const iconList = Object.entries(Icons);

  return (
    <Flexrow className="flex-wrap gap-4 p-4">
      {iconList.map(([name, IconComponent]) => (
        <Flexrow
          key={name}
          className={cn(
            "border-slate-a7 w-max items-center justify-center gap-2 rounded-lg border p-4",
            cardBgv2, // Using your card background style
          )}
          style={{ width: "150px", height: "100px" }} // Fixed size for tiles
        >
          {/* Render the icon component */}
          <IconComponent className="text-trip-a2 text-3xl" />
          {/* Display the key name */}
          <span className="text-slate-a4 text-sm">{name}</span>
        </Flexrow>
      ))}
    </Flexrow>
  );
};
