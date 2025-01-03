import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "~/services/apiBookingService";
import { Booking } from "~/types";

export const useCheckIn = function () {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: checkIn,
    isPending: isCheckingIn,
    error,
  } = useMutation({
    mutationFn: ({ bookingId, breakfastData }: { bookingId: string; breakfastData: Partial<Booking> }) =>
      updateBooking({
        id: bookingId,
        data: {
          isPaid: true,
          status: "checked-in",
          ...breakfastData,
        },
      }),
    //* in the onSuccess we can access to the data return from the mutation function to do something like in this case we can use it to display the specify message....
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["today_activities"] });
      toast.success(`Booking #${data?._id} is checked in successful`);
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Check in not successful please check again");
    },
  });

  return { checkIn, isCheckingIn, error };
};
