import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form>
        <button
          type="submit"
          formAction={async () => {
            "use server";

            await signOut();
          }}
        >
          Sign out
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
