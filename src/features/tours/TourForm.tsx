import styled from "styled-components";
import { SubmitHandler, useForm, FieldErrors, FieldValues } from "react-hook-form";

import useCreateCabin from "../cabins/useCreateCabin";
import useEditCabin from "../cabins/useEditCabin";
import Button from "~/components/Button";
import { FileInput, Form, FormRow, Input } from "~/components/form";
import Cabin from "~/types/cabin.type";
import toast from "react-hot-toast";
import Textarea from "~/components/form/Textarea";
import { TourInput } from "~/types";
// import { useModalContext } from "~/components/Modal";
// import Cabin from "../../types/cabin.type";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getDataGeolocation } from "~/services/apiGeoService";

const Buttons = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-left: auto;
  margin-right: 0;
  padding-top: 2rem;
`;

const DateField = styled.div`
display: flex;
flex-direction: column;
gap: 1.2rem;
`;

const DateBox = styled.div`
display: flex;
gap: 1.2rem;
`;

const LocationBox = styled.div`
display: flex;
flex-direction: column;
gap: 1.2rem;
`;

const LocationSearchBox = styled.div`
display: flex;
gap: 1.2rem;
`;

const LocationField = styled.div`
display: flex;
flex-direction: column;
gap: 1.2rem;
`;


// const Textarea = styled.textarea`
//   padding: 1.6rem 1.2rem;
//   border-radius: var(--border-radius-sm);
//   /* border-color: inherit; */
//   border: 1.5px solid var(--color-grey-200);
//   width: 55%;
//   resize: none;

//   &:focus {
//     /* border: none; */
//   }
// `;

interface Inputs extends FieldValues {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
}

interface CabinFormProps {
  // * because now we can pass in this setShowForm via cloneElement in Modal.Window component so therefore this prop can be optional because we have case we don't need to pass in setShowForm prop tp CabinForm when we use it with Modal component right

  onCloseModal?: (show: boolean) => void;
  cabinToEdit?: Cabin;
}

// function CabinForm({ cabinToEdit }: CabinFormProps) {
function TourForm({ onCloseModal: setShowForm, cabinToEdit }: CabinFormProps) {
  const [startDate, setStartDate] = useState(new Date());
  const [startLocation, setStartLocation] = useState('');
  const [startLocationStr, setStartLocationStr] = useState('');
  const [startDates, setStartDates] = useState<Date[]>([]);
  // const { open: setShowForm } = useModalContext()!;
  const { id: editId, ...editData } = cabinToEdit || {};
  const { register, handleSubmit, formState, getValues, reset } = useForm<TourInput>({
    defaultValues: editId ? (editData as FieldValues) : {},
  });

  const { errors } = formState;

  const { isCreating, createCabinMutate } = useCreateCabin();
  const { isEditing, editCabinMutate } = useEditCabin();

  const isWorking = isCreating || isEditing;
  const handleClickAddDate = function () {
    if (!startDate) return

    const newStartDates = [...startDates, startDate]

    setStartDates(newStartDates)
    setStartDate(new Date())
  }

  const handleAddLocation = async function () {
    if (!startLocation.length) return
    console.log(startLocation)
    const coordinates = startLocation.split(',')

    const data = await getDataGeolocation(coordinates[0], coordinates[1])
    console.log(data)
    const locationStr = `${data.locality}, ${data.name}, ${data.country}`

    setStartLocationStr(locationStr)
    setStartLocation('')
  }

  const onSubmit: SubmitHandler<TourInput> = function (data) {
    // console.log(data);
    // mutate({ ...data, image: data.image[0] });
    // if (editId) return console.log(data);
    // if (editId)
    //   return editCabinMutate(
    //     { id: editId, newCabinData: data },
    //     {
    //       onSuccess: (data: Cabin) => {
    //         // * notice that in the onSuccess we can access to the newly data so it can be the new edited data in this case
    //         console.log(data);
    //         setTimeout(() => {
    //           setShowForm?.(false);
    //         }, 1000);
    //       },
    //     }
    //   );

    // createCabinMutate(data, {
    //   onSuccess: (data: Cabin) => {
    //     // * notice that in the onSuccess we can access to the newly data so it can be the new created data in this case
    //     console.log(data);
    //     toast.success("Create new cabin successful");
    //     reset();
    //     setTimeout(() => {
    //       setShowForm?.(false);
    //     }, 1000);
    //   },
    // });
  };

  const onError = function (errors: FieldErrors) {
    console.log(errors);
  };

  /*
      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", { required: "This field is required" })} />
        {errors.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow> 
      * we can refactor this code here to the the FormRow component because in there we have things repeat many times right like Label and Error
  */

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="name" errorMsg={errors.name?.message || ""}>
        {/* <Input type="text" id="name" {...register("name", { required: true })} /> 
        instead use it with required true we can custom it with the message text to show the message on UI for users right*/}
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="type" errorMsg={errors.type?.message || ""}>
        <Input
          type="text"
          id="type"
          {...register("type", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="difficulty" errorMsg={errors.difficulty?.message || ""}>
        <Input
          type="text"
          id="difficulty"
          {...register("difficulty", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Max Group Size" errorMsg={errors.maxGroupSize?.message || ""}>
        <Input
          type="number"
          id="maxGroupSize"
          {...register("maxGroupSize", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="price" errorMsg={errors.price?.message || ""}>
        <Input
          type="number"
          id="price"
          {...register("price", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="duration" errorMsg={errors.duration?.message || ""}>
        <Input
          type="number"
          id="duration"
          {...register("duration", {
            required: "This field is required",
            validate: (val: number) => val <= +getValues().regularPrice || "Duration must less than price",
          })}
          disabled={isWorking}
          defaultValue={0}
        />
      </FormRow>

      <FormRow label="summary" errorMsg={errors.summary?.message || ""}>
        <Textarea
          id="summary"
          {...register("summary", {
            required: "This field is required",
            validate: (text: string) => {
              return text.split(" ").length > 2 || "This string must be more 3 words";
            },
          })}
          disabled={isWorking}
        ></Textarea>
      </FormRow>

      <FormRow label="description" errorMsg={errors.description?.message || ""}>
        <Textarea
          id="description"
          {...register("description", {
            required: "This field is required",
            validate: (text: string) => {
              return text.split(" ").length > 2 || "This string must be more 3 words";
            },
          })}
          disabled={isWorking}
        ></Textarea>
      </FormRow>

      <FormRow label="Image Cover" errorMsg={errors.imageCover?.message || ""}>
        {/* <Input
          type="text"
          id="image"
          {...register("image", { required: "This field is required" })}
          disabled={isCreating}
        /> */}
        <FileInput
          id="imageCover"
          {...register("imageCover", { required: editId ? false : "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="image 1" errorMsg={errors.image1?.message || ""}>
        <FileInput
          id="image1"
          {...register("image1", { required: editId ? false : "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="image 2" errorMsg={errors.image2?.message || ""}>
        <FileInput
          id="image2"
          {...register("image2", { required: editId ? false : "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="image 3" errorMsg={errors.image3?.message || ""}>
        <FileInput
          id="image3"
          {...register("image3", { required: editId ? false : "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="start dates" errorMsg={errors.startDates?.message || ""}>
        <DateField>
          <DateBox>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(new Date(date!))} />
            <Button type="button" $size="medium" $variation={'secondary'} onClick={handleClickAddDate}>Add date</Button>
          </DateBox>
          {startDates?.map((date: Date, ind) => <p>
            <span>Start Date {ind + 1}: </span>
            <span>{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: '2-digit' })}</span>
          </p>
          )}
          {/* <Input
            type="text"
            id="difficulty"
            {...register("difficulty", { required: "This field is required" })}
            disabled={isWorking}
          /> */}
        </DateField>
      </FormRow>

      <FormRow label="start location" errorMsg={errors.startDates?.message || ""}>
        <LocationField>
          <LocationBox>
            <Link target="_blank" to={'https://www.google.com/maps'}>Go to google map and search for the needed location and copy the location and paste here</Link>
            <LocationSearchBox>
              <Input
                type="text"
                id="start-location"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                disabled={isWorking}
              />
              <Button type="button" $size="medium" onClick={handleAddLocation}>Add location</Button>
            </LocationSearchBox>
            <>
              {startLocationStr && <p>{startLocationStr}</p>}</>
          </LocationBox>
          <>
          </>
        </LocationField>
      </FormRow>

      <FormRow label="locations" errorMsg={errors.startDates?.message || ""}>
        <LocationField>
          <LocationBox>
            <Link target="_blank" to={'https://www.google.com/maps'}>Go to google map and search for the needed location and copy the location and paste here</Link>
            <LocationSearchBox>
              <Input
                type="text"
                id="start-location"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                disabled={isWorking}
              />
              <Button type="button" $size="medium" onClick={handleAddLocation}>Add location</Button>
            </LocationSearchBox>
            <>
              {startLocationStr && <p>{startLocationStr}</p>}</>
          </LocationBox>
          <>
          </>
        </LocationField>
      </FormRow>

      <Buttons>
        <Button $size="medium" $variation="secondary" type="reset" onClick={() => setShowForm?.(false)}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isWorking ? "Processing" : editId ? "Edit cabin" : "Create new cabin"}</Button>
      </Buttons>
    </Form>
  );
}

export default TourForm;
