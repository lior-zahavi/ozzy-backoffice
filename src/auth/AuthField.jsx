function AuthField({
    id,
    label,
    icon,
    action,
    type = "text",
    ...inputProps}) 
  {
    return (
      <div className="auth-field">
        <div className="auth-field-label-row">
          <label htmlFor={id}>{label}</label>
          {action}
        </div>
  
        <div className="auth-input-wrapper">
          <span
            className="material-symbols-outlined auth-input-icon"
            aria-hidden="true">
            {icon}
          </span>
  
          <input id={id} type={type} {...inputProps} />
        </div>
      </div>
    )
  }
  
  export default AuthField;