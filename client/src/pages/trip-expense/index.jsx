// --- React Core ---
import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// --- 3rd Party Libraries ---
import moment from "moment";

// --- App Hooks ---
import useTripConfig from "@/hooks/useTripConfig";

// --- App Components ---
import CreateTripForm from "@/components/Forms/Create-Trip-Form";
import ExpButton from "@/components/buttons/exp-button";
import { Icons } from "@/components/icons";
import Flexcol from "@/components/section/flexcol";
import Flexrow from "@/components/section/flexrow";
import SectionTitle from "@/components/section/section-title";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// --- App Utilities ---
import { cardBg } from "@/global/style";
import { cn } from "@/lib/utils";
import { PATH } from "@/router/routerConfig";
import { Spinner } from "flowbite-react";

const TripIndex = () => {
  const navigate = useNavigate();
  const { TripList, TripLoading, TripError } = useTripConfig();

  const ITEMS_PER_PAGE = 12;
  const [page, setPage] = useState(1);
  // --- Memoize Pagination Calculations ---
  const totalPages = useMemo(
    () => Math.ceil(TripList.length / ITEMS_PER_PAGE),
    [TripList],
  );
  const currentPageItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return TripList.slice(start, end);
  }, [TripList, page]);

  // --- Memoize Click Handlers ---
  const handlePreviousPage = useCallback(() => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }, [totalPages]);
  // NOTE: 1. Handle the loading state first
  if (TripLoading) {
    // Replace with your preferred loading spinner component
    return (
      <Flexrow className="h-full items-center justify-center">
        <Spinner
          className="text-slate-a3 fill-rep-a1"
          size="lg"
          aria-label="expense page loader"
        />
      </Flexrow>
    );
  }

  // NOTE: 2. Handle the error state next
  if (TripError) {
    return (
      <>
        <Flexrow className="h-full items-center justify-center">
          ERROR : {TripError}
        </Flexrow>
      </>
    );
  }

  //NOTE: 3. Handle the "no data" state
  if (!TripList || TripList.length === 0) {
    // This gives the user a clear message if there's nothing to show
    return <CreateTripForm />;
  }

  // NOTE: 4. If all checks pass, render the main content

  return (
    <>
      <Flexrow className={"items-center"}>
        <CreateTripForm />
      </Flexrow>
      <Flexcol className="pt-20">
        <SectionTitle title="Trips" isTrip />

        <div className={"grid w-full grid-cols-3 gap-5"}>
          {currentPageItems.map((trip) => (
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
          ))}
        </div>
        <Pagination className="py-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePreviousPage}
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
                onClick={handleNextPage}
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
