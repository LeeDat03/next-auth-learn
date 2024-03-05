import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { CardWrapper } from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
  return (
    <>
      <CardWrapper
        headerLabel="Opps! Something went wrong!"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login page"
      >
        <div className="w-full items-center flex justify-center">
          <ExclamationTriangleIcon className="text-destructive" />
        </div>
      </CardWrapper>
    </>
  );
};
