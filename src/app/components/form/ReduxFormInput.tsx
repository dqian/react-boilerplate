import React from 'react';

const ReduxFormInput: React.FC = (field: any) => (
    <div>
        <label>{field.label}</label>
        <input
            {...field.input}
            type={field.type}
            placeholder={field.placeHolder}
            max={field.maxDate}
            min={field.minDate}
            step={field.step}
            disabled={field.disabled}
        />
        {field.meta.touched && <p className="text-danger">{field.meta.error}</p>}
    </div>
);

export default ReduxFormInput;