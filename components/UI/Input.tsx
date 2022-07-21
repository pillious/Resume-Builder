import useInput from "../../hooks/use-input";

const Input = () => {
    const {
        value: fNameValue,
        // isValid: fNameIsValid,
        hasError: fNameHasError,
        valueChangeHandler: fNameChangeHandler,
        inputBlurHandler: fNameBlurHandler,
        // reset: fNameReset,
    } = useInput((value) => value.trim() !== "");

    // const formIsValid = fNameIsValid;

    const fNameClasses = fNameHasError
        ? "form-control invalid"
        : "form-control";

    return (
        <div className={fNameClasses}>
            <label htmlFor="fname">First Name</label>
            <input
                type="text"
                id="fname"
                value={fNameValue}
                onChange={fNameChangeHandler}
                onBlur={fNameBlurHandler}
            />
            {fNameHasError && (
                <p className="error-text">First name must not be empty.</p>
            )}
        </div>
    );
};

export default Input;
