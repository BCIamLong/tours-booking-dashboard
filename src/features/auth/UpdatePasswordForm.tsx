import { SubmitHandler, useForm } from "react-hook-form";
import Button from "~/components/Button";
import { Buttons, Form, FormRow, Input } from "~/components/form";
import { useUpdatePassword } from "./useUpdatePassword";
import { useCheckPassword } from "./useCheckPassword";
import { CheckPasswordInput, EditPasswordInput } from "~/types";
import { useState } from "react";
import { useUser } from "./useUser";
import Spinner from "~/components/Spinner";


export default function UpdatePasswordForm() {
  const { register, reset, formState, getValues, handleSubmit } = useForm<EditPasswordInput>();
  const { errors } = formState;
  const { register: register1, handleSubmit: handleSubmit1, reset: reset1, formState: formState1 } = useForm<CheckPasswordInput>()
  const { errors: errors1 } = formState1


  const [isAllowed, setIsAllowed] = useState(false)
  const { updatePassword, isUpdating } = useUpdatePassword();
  const { checkPassword, isChecking } = useCheckPassword()

  const { user: { updatePasswordToken: token }, isLoading } = useUser()

  const onSubmit: SubmitHandler<EditPasswordInput> = function (data) {
    // console.log(data)
    updatePassword({ data, token }, {
      onSuccess: () => {
        reset()
        setIsAllowed(false)
      }
    })
  }

  const onHandleCheckPassword: SubmitHandler<CheckPasswordInput> = function (data) {
    // console.log(data)
    checkPassword(data, {
      onSuccess: () => {
        reset1()
        setIsAllowed(true)
      }
    })
  }

  if (isLoading) return <Spinner />

  return (
    <>
      {!isAllowed ?
        <Form onSubmit={handleSubmit1(onHandleCheckPassword)}>
          <FormRow label="Current password" errorMsg={errors1.password?.message || ""}>
            <Input
              id="cur-password"
              type="password"
              disabled={isUpdating}
              {...register1("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
          </FormRow>
          <Buttons>
            <Button $variation="secondary" type="reset" onClick={() => reset1} disabled={isChecking}>
              Cancel
            </Button>
            <Button disabled={isChecking}>{isChecking ? "Checking" : "Check password"}</Button>
          </Buttons>
        </Form>
        :
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow label="New password" errorMsg={errors.password?.message || ""}>
            <Input
              id="password"
              type="password"
              disabled={isUpdating}
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
          </FormRow>
          <FormRow label="Confirm password" errorMsg={errors.passwordConfirm?.message || ""}>
            <Input
              id="passwordConfirm"
              type="password"
              disabled={isUpdating}
              {...register("passwordConfirm", {
                required: "This field is required",
                validate: (val) => val === getValues().password || "Please provide the correct confirm password",
              })}
            />
          </FormRow>
          <Buttons>
            <Button $variation="secondary" type="reset" onClick={() => reset} disabled={isUpdating}>
              Cancel
            </Button>
            <Button disabled={isUpdating}>{isUpdating ? "Updating" : "Update password"}</Button>
          </Buttons>
        </Form>}
    </>
  );
}
