const Button = ({ buttonText, additionalClass, onclick }) => {
    return (
        <>
            <button
                className={`w-fit mb-3 ${additionalClass}`}
                onClick={onclick}
                type="button"
            >{buttonText}</button>
        </>
    )
}

export default Button;