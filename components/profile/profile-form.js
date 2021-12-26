import { useRef } from "react";
import classes from "./profile-form.module.css";

const ProfileForm = ({ onChangePassword }) => {
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredOldPassword = oldPasswordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;

    // optional: add validation

    onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
