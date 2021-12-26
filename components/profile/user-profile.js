import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

const UserProfile = () => {
  /* useEffect(() => {
    if (!session) {
      window.location.href = "/auth";
    }
  }, [session]); */

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
