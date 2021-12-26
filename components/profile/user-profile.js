import { useSession, getSession } from "next-auth/react";
import { useEffect } from "react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

const UserProfile = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      window.location.href = "/auth";
    }
  }, [session]);

  if (status === "loading") {
    return <p className={classes.profile}>Loading...</p>;
  } else {
    return (
      <section className={classes.profile}>
        <h1>Your User Profile</h1>
        <ProfileForm />
      </section>
    );
  }
};

export default UserProfile;
