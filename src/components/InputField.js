import React, {useState} from "react";


export const InputField = ({label, ph, name, id}) => {
    return (
        <div className="form__group field">
            <input type="input" className="form__field" placeholder={ph} name={name} id={id} required/>
            <label htmlFor={name} className="form__label">{label}</label>
        </div>
    )
}