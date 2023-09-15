import { useEffect, useState } from "react";

const Input = ({ value, label, onchange, type, readonly, onclick, errorClass }) => {
    return (
        <>
            <div>
                <h6 className="text-left font-mono font-semibold ml-3">{label}</h6>
                <input value={value} onChange={onchange} className={`border-gray-500 border rounded-lg m-3 px-3 py-2 -mb-1 ${errorClass}`} onClick={onclick} readOnly={readonly} type={type} />

            </div>
        </>
    )
}

export default Input;