import ExpButton from "@/components/buttons/exp-button";
import CreateTripForm from "@/components/Forms/Create-Trip-Form";
import { Icons } from "@/components/icons";
import Flexcol from "@/components/section/flexcol";
import Flexrow from "@/components/section/flexrow";
import SectionTitle from "@/components/section/section-title";
import { cardBg } from "@/global/style";
import useTripConfig from "@/hooks/useTripConfig";
import { cn } from "@/lib/utils";
import { PATH } from "@/router/routerConfig";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const TripIndex = () => {
  const navigate = useNavigate();
  //console.log("STEP", step, "OPEN", open);
  const { TripList } = useTripConfig();
  const list = TripList ?? [];

  const ITEMS_PER_PAGE = 12;
  const [page, setPage] = useState(1);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentPageItems = list.slice(start, end);
  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);

  return (
    <>
      <Flexrow className={"items-center"}>
        <CreateTripForm />
      </Flexrow>
      <Flexcol className="pt-20">
        <SectionTitle title="Trips" isTrip />

        <div className={"grid w-full grid-cols-3 gap-5"}>
          {currentPageItems.map((trip) => (
            <>
              <Flexcol
                key={trip._id}
                className={cn("justify-between gap-3.5 p-5 shadow-md", cardBg)}
              >
                <Flexrow className="text-12px font-medium">
                  <Flexrow className="items-center justify-start gap-2">
                    <Icons.upbar className={"text-trip-a2"} />
                    {moment(trip.startOn).format("DD MMM, YYYY")}
                  </Flexrow>
                  <Flexrow className="items-center justify-end gap-2">
                    <Icons.upbar className={"text-trip-a2"} />
                    {moment(trip.endsOn).format("DD MMM, YYYY")}
                  </Flexrow>
                </Flexrow>
                <Flexrow className={"text-18px items-center gap-2 font-medium"}>
                  <Icons.trip className={"text-trip-a2"} />
                  <span>{truncate(trip.tripTitle)}</span>
                </Flexrow>
                <Flexrow className={"text-12px font-medium"}>
                  <Flexrow className={"items-center gap-1"}>
                    <Icons.rupee className={"text-trip-a2"} />
                    <span>{5000}</span>
                  </Flexrow>
                  <Flexrow className={"w-max justify-end gap-2"}>
                    <ExpButton
                      className={"bg-trip-a3 text-dark-a2 !text-18px"}
                      custom_iconbtn
                      custom_toolContent={"View Trip"}
                      onClick={() => navigate(trip._id)}
                    >
                      <Icons.view />
                    </ExpButton>
                    <ExpButton
                      className={"bg-trip-a3 text-dark-a2 !text-18px"}
                      custom_iconbtn
                      onClick={() =>
                        navigate(`${trip._id}/${PATH.addTripExpense}`)
                      }
                    >
                      <Icons.add_circle_v2 />
                    </ExpButton>
                  </Flexrow>
                </Flexrow>
              </Flexcol>
            </>
          ))}
        </div>
        <Pagination className="py-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className={
                  page === 1
                    ? "bg-dark-a3 pointer-events-none cursor-not-allowed"
                    : `bg-trip-a3 text-dark-a2 cursor-pointer`
                }
              >
                <Icons.pageBack />
              </PaginationPrevious>
            </PaginationItem>

            <PaginationItem className="px-2 text-sm">
              Page {page} of {totalPages}
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className={
                  page === totalPages
                    ? "bg-dark-a3 pointer-events-none cursor-not-allowed"
                    : `bg-trip-a3 text-dark-a2 cursor-pointer`
                }
              >
                <Icons.pageNext />
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Flexcol>
    </>
  );
};

export default TripIndex;

const truncate = (str) => (str.length > 24 ? str.slice(0, 24) + "..." : str);
