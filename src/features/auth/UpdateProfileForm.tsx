import { Buttons, FileInput, Form, FormRow, Input } from "~/components/form";
import { useUser } from "./useUser";
import Button from "~/components/Button";
import { FormEvent, useRef, useState } from "react";
import { useUpdateProfile } from "./useUpdateProfile";

export default function UpdateProfileForm() {
  const { user } = useUser();
  const { email, name } = user || {};
  const avatarFile = useRef(null)
  // const { fullName: currentFullName } = user_metadata || {};

  const [fullName, setFullName] = useState(name);
  const [avatar, setAvatar] = useState<FileList>();

  const { updateProfile, isUpdating } = useUpdateProfile();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    updateProfile({ avatar: avatar!, name: fullName }, {
      onSuccess: () => {
        if (avatarFile.current) (avatarFile.current as HTMLInputElement).value = ''
      }
    });

    // setAvatar();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email" errorMsg="">
        <Input type="email" id="email" value={email} disabled />
      </FormRow>
      <FormRow label="Full Name" errorMsg="">
        <Input
          type="text"
          id="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar" errorMsg="">
        <FileInput ref={avatarFile} type="file" id="avatar" onChange={(e) => setAvatar(e.target?.files || undefined)} disabled={isUpdating} />
      </FormRow>

      <Buttons>
        <Button $variation="secondary" type="reset" onClick={() => setFullName(name)} disabled={isUpdating}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>{isUpdating ? "Updating" : "Update profile"}</Button>
      </Buttons>
    </Form>
  );
}
